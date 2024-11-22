<!--
 * @Author: blue
 * @Date: 2024-11-21 17:05:19
 * @FilePath: /vue-fabric-editor/src/views/home/components/page/index.vue
-->
<script setup>
import useSelect from '@/hooks/select';
const props = defineProps(['setPageData']);

const { canvasEditor } = useSelect();
const historyMap = ref({});
const currentIndex = ref(0);

let defaultStr = '';

watch(
  () => historyMap.value,
  (data) => {
    props.setPageData?.(data);
  },
  { deep: true }
);

function transformText(objects) {
  if (!objects) return;
  objects.forEach((item) => {
    if (item.objects) {
      transformText(item.objects);
    } else {
      item.type === 'text' && (item.type = 'textbox');
    }
  });
}

const saveStr = () => {
  return new Promise((resolve) => {
    canvasEditor.preview().then(async (img) => {
      const dataUrl = canvasEditor.getJson();
      await transformText(dataUrl.objects);
      const fileStr = `${JSON.stringify(dataUrl, null, '\t')}`;
      historyMap.value[currentIndex.value] = { data: fileStr, previewImg: img };
      resolve(fileStr);
    });
  });
};

onMounted(() => {
  saveStr().then((str) => {
    defaultStr = str;
  });

  canvasEditor.canvas.on('object:modified', saveStr);
  canvasEditor.on('selectOne', saveStr);
});

const previewList = computed(() => {
  return Object.values(historyMap.value).map((item) => item.previewImg);
});

const fnAdd = async () => {
  await saveStr();
  currentIndex.value = Object.keys(historyMap.value).length;
  canvasEditor.loadJSON(defaultStr, () => {
    historyMap.value[currentIndex.value] = { data: defaultStr, previewImg: '' };
  });
};

const fnItemClick = async (i) => {
  if (currentIndex.value === i) return;
  await saveStr();
  canvasEditor.loadJSON(Object.values(historyMap.value)[i].data, () => {
    currentIndex.value = i;
  });
};
</script>

<template>
  <div class="box">
    <div v-for="(src, i) in previewList" :key="i" @click="fnItemClick(i)">
      <img
        :src="src"
        :style="`width: 160px; height: 90px; background: #ccc; margin-right: 5px;border: 1px solid ${
          i === currentIndex ? 'red' : '#ccc'
        }`"
      />
    </div>

    <!-- + -->
    <button @click="fnAdd">添加</button>
  </div>
</template>

<style lang="less" scoped>
.box {
  position: absolute;
  bottom: 10px;
  left: 40px;
  background: #fff;
  padding: 10px;
  display: flex;
}
</style>
