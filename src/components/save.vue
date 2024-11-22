<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-11-22 14:28:33
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-04-10 14:33:18
 * @Description: 保存文件
-->

<template>
  <div class="save-box">
    <Button style="margin-left: 10px" type="text" @click="beforeClear">
      {{ $t('save.empty') }}
    </Button>
    <Dropdown style="margin-left: 10px" @on-click="saveWith">
      <Button type="primary">
        {{ $t('save.down') }}
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <template #list>
        <DropdownMenu>
          <DropdownItem name="savePPT" divided>保存PPT</DropdownItem>
          <DropdownItem name="savePDF" divided>保存PDF</DropdownItem>
          <!-- <DropdownItem name="saveMyClould">{{ $t('save.save_my_spase') }}</DropdownItem> -->
          <DropdownItem name="saveImg" divided>{{ $t('save.save_as_picture') }}</DropdownItem>
          <DropdownItem name="saveSvg">{{ $t('save.save_as_svg') }}</DropdownItem>
          <DropdownItem name="clipboard" divided>{{ $t('save.copy_to_clipboard') }}</DropdownItem>
          <DropdownItem name="clipboardBase64">{{ $t('save.copy_to_clipboardstr') }}</DropdownItem>
          <DropdownItem name="saveJson" divided>{{ $t('save.save_as_json') }}</DropdownItem>
        </DropdownMenu>
      </template>
    </Dropdown>
  </div>
</template>

<script setup name="save-bar">
import { Modal } from 'view-ui-plus';
import useSelect from '@/hooks/select';
import useMaterial from '@/hooks/useMaterial';
import { debounce } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { Spin } from 'view-ui-plus';
import { useRoute } from 'vue-router';
import { Message } from 'view-ui-plus';
import pptxgen from 'pptxgenjs';
import { jsPDF } from 'jspdf';
const route = useRoute();

const { createTmplByCommon, updataTemplInfo, routerToId } = useMaterial();

const { t } = useI18n();

const { canvasEditor } = useSelect();

onMounted(() => {
  nextTick(() => {
    canvasEditor.setSize(1280, 720);
  });
});

const pageData = inject('pptPageData');

const cbMap = {
  async clipboard() {
    try {
      await canvasEditor.clipboard();
      Message.success('复制成功');
    } catch (error) {
      Message.error('复制失败');
    }
  },
  saveJson() {
    canvasEditor.saveJson();
  },
  async savePPT() {
    console.log('pageData', pageData.value);
    /**
     * 将像素转换为英寸
     * @param {number} pixels - 要转换的像素值
     * @param {number} dpi - DPI 值，默认为96
     * @returns {number} - 转换后的英寸值
     */
    function pixelsToInches(pixels, dpi = 96) {
      return pixels / dpi;
    }

    console.log(canvasEditor.canvas.getObjects());

    const pptx = new pptxgen();

    pptx.defineLayout({ name: 'A4', width: 13.33, height: 7.5 });
    pptx.layout = 'A4';

    const fnAddSlide = (key) => {
      return new Promise((resolve) => {
        const task = () => {
          const slide = pptx.addSlide();
          const elList = canvasEditor.canvas.getObjects();
          elList.forEach(async (el) => {
            if (el.id && el.id === 'workspace') return;
            const { left, top, width, height, scaleX, scaleY, type } = el;
            const x = pixelsToInches(left);
            const y = pixelsToInches(top);
            const w = pixelsToInches(width * scaleX);
            const h = pixelsToInches(height * scaleY);
            console.log(type);
            if (type === 'image') {
              slide.addImage({ path: el.src, x, y, w, h });
            } else if (['circle', 'triangle', 'rect', 'polygon'].includes(type)) {
              slide.addImage({ data: el.toDataURL(), x, y, w, h });
            } else if (['text', 'textbox', 'i-text'].includes(type)) {
              slide.addText(el.text, { fontSize: el.fontSize, x, y, color: '000000' });
            }
          });
        };
        if (Object.keys(pageData.value) === 1) {
          task();
          resolve();
        } else {
          canvasEditor.loadJSON(pageData.value[key].data, () => {
            task();
            resolve();
          });
        }
      });
    };

    async function executeTasks() {
      const keys = Object.keys(pageData.value);
      for (const key of keys) {
        await fnAddSlide(key);
      }
    }

    executeTasks().then(() => {
      pptx.writeFile('presentation.pptx');
    });
  },
  async savePDF() {
    const dataURL = await canvasEditor.preview();
    const doc = new jsPDF();
    doc.addImage(dataURL, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);
    console.log(dataURL);
    doc.save('download.pdf');
  },
  saveSvg() {
    canvasEditor.saveSvg();
  },
  saveImg() {
    canvasEditor.saveImg();
  },
  async clipboardBase64() {
    try {
      await canvasEditor.clipboardBase64();
      Message.success('复制成功');
    } catch (error) {
      Message.error('复制失败');
    }
  },
  async saveMyClould() {
    try {
      Spin.show();
      if (route?.query?.id) {
        await updataTemplInfo(route?.query?.id);
      } else {
        const res = await createTmplByCommon();
        routerToId(res.data.data.id);
      }
    } catch (error) {
      Message.warning('请登录');
    }
    Spin.hide();
  },
};

const saveWith = debounce(function (type) {
  cbMap[type] && typeof cbMap[type] === 'function' && cbMap[type]();
}, 300);

/**
 * @desc clear canvas 清空画布
 */
const clear = () => {
  canvasEditor.clear();
  canvasEditor.canvas.clearHistory(false);
  canvasEditor.historyUpdate();
};

const beforeClear = () => {
  Modal.confirm({
    title: t('tip'),
    content: `<p>${t('clearTip')}</p>`,
    okText: t('ok'),
    cancelText: t('cancel'),
    onOk: () => clear(),
  });
};
</script>

<style scoped lang="less">
.save-box {
  display: inline-block;
  padding-right: 10px;
}
</style>
