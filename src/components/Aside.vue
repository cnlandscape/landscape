<template>
  <div class="selectContent">
    <div>
      <div class="reset" @click="reset">
        <i class="el-icon-refresh-right"></i>
        重置过滤条件
      </div>
      <Select :data="group"></Select>
      <Select :data="sort"></Select>
      <Select :data="company"></Select>
      <Select :data="offical"></Select>
      <Select :data="location"></Select>
    </div>
    <div>
      <div>过滤器示例</div>
      <el-tag v-for="(tag, index) in tags" :key="index" class="tag" @click="useTags(tag)">{{ tag.title }}</el-tag>
    </div>
    <div class="download_container">
      <a :href="`${path}landscape.pdf`" download="新生态图.pdf" class="download">
        <i class="el-icon-download"></i>
        下载 CNIA 云原生全景图
      </a>
    </div>
  </div>
</template>

<script>
import Select from '@/components/SelectGroup.vue'

export default {
  components: {
    Select
  },
  data() {
    return {
      path:process.env.BASE_URL,
      group: {
        title: "开源项目",
        key: "open",
        options: [{
          value: 'nation',
          label: '国内开源主导'
        }, {
          value: 'foreign',
          label: '国外开源主导'
        }]
      },
      sort: {
        title: "项目所属基金会",
        key: "foundation",
        options: [{
          value: 'cncf',
          label: 'CNCF'
        }, {
          value: 'apache',
          label: 'Apache'
        }]
      },
      company: {
        title: "项目发起组织",
        key: "company",
        options: [{
          value: 'alibaba',
          label: '阿里巴巴'
        }, {
          value: 'tencent',
          label: '腾讯'
        }, {
          value: 'huawei',
          label: '华为'
        }, {
          value: 'baidu',
          label: '百度'
        }, {
          value: 'ant',
          label: '蚂蚁金服'
        }]
      },
      offical: {
        title: "项目版权",
        key: "offical",
        options: [{
          value: 'notOffical',
          label: '非商业版'
        }, {
          value: 'isOffical',
          label: '商业版'
        }]
      },
      location: {
        title: "组织所在区域",
        key: "location",
        options: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Tianjing',
          label: '天津'
        }]
      },
      tags: [
        {
          title: "开源景观",
          filters: [
            {
              key: "open",
              options: ["nation", "foreign"]
            }
          ]
        },
        {
          title: "北京地区",
          filters: [
            {
              key: "open",
              options: ["nation"]
            },
            {
              key: "location",
              options: ["Beijing"]
            }
          ]
        },
        {
          title: "认证的 K8s",
          filters: [
            {
              key: "foundation",
              options: ["cncf"]
            }
          ]
        },
      ]
    }
  },
  methods: {
    reset() {
      this.$store.commit('resetFilters')
    },
    useTags(tag) {
      this.$store.commit('useTag', tag)
    }
  }
}
</script>

<style scoped>
.selectContent {
  text-align: left;
  padding: 6px 8px;
  font-size: 14px;
}

.reset {
  margin-bottom: 10px;
  color: #4780b8;
  cursor: pointer;
}

.tag {
  margin-right: 8px;
  margin-bottom: 6px;
  margin-top: 6px;
  cursor: pointer;
}

.download_container {
  margin-top: 10px;
}

.download {
  text-decoration: none;
  color: #4780b8;
}
</style>