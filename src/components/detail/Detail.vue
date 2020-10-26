<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="product-dialog"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @closed="dialogClosed"
    >
      <el-row :gutter="40">
        <el-col :span="8">
          <div class="detail_image_container">
            <img :src="`logos/${data.logo}`" alt="" class="detail_image">
          </div>
          <div class="detail_tags_container">
            <div v-for="(tag, index) in data.tags" :key="index" class="tags">
              <span class="tag_name">{{ tag.name }}</span>
              <span class="tag_value">{{ tag.value }}</span>
            </div>
          </div>
          <div class="detail_chars_container">
            <vue-content-loading :width="400" :height="300" v-if="loading">
              <rect x="0" y="0" rx="4" ry="4" width="400" height="300" />
            </vue-content-loading>
            <Chart :commits="data.commits" :dates="data.dates" v-else-if="data.commits.length"></Chart>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="detail_main">
            <p class="detail_title">{{ data.name }}</p>
            <p class="detail_category">{{ category.category }} · {{ subcategory.name }}</p>
            <p class="detail_description">{{ data.description }}</p>
          </div>
          <div class="detail_sub">
            <vue-content-loading :width="400" :height="100" v-if="loading">
              <rect x="0" y="0" rx="4" ry="4" width="400" height="15" />
              <rect x="0" y="25" rx="4" ry="4" width="400" height="15" />
              <rect x="0" y="50" rx="4" ry="4" width="400" height="15" />
              <rect x="0" y="75" rx="4" ry="4" width="400" height="15" />
            </vue-content-loading>
            <el-form ref="form" :model="data" label-width="80px" label-position="left" size="small" v-else>
              <el-form-item v-for="(value, index) in data.properties" :key="index" :label="value.name">
                <a class="detail_sub_link" :underline="false" :href="value.src" target="_blank" v-if="value.src">
                  {{ value.value }}
                </a>
                <div v-else>
                  <span class="detail_name">
                    {{ value.value }}
                  </span>
                </div>
                <div v-if="value.count" class="detail_star">
                  <i class="el-icon-star-on"></i>{{value.count}}
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
   </el-dialog>
  </div>
</template>

<script>
import Chart from '@/components/detail/Chart.vue'
import VueContentLoading from 'vue-content-loading'
import { constants } from 'zlib'
import moment from 'moment'

export default {
  name: "detail",
  data() {
    return {
      dialogVisible: false,
      data: {
        commits: [],
        dates: [],
        properties: []
      },
      category: {},
      subcategory: {},
      loading: true
    };
  },
  components: {
    'vue-content-loading': VueContentLoading,
    Chart
  },
  methods: {
    getGithubInfo: async function(group, project) {
      return await Promise.all([
        this.$fetch(`/repos/${group}/${project}`),
        this.$fetch(`/repos/${group}/${project}/stats/commit_activity`)
      ])
    },
    show: async function (data, subcategory, category) {
      this.category = category
      this.subcategory = subcategory
      this.dialogVisible = true

      const githubUrl = data.repo_url || ""
      const repos = githubUrl ? githubUrl.replace("https://github.com/", "").replace("github.com/", "").split('/'): githubUrl

      if (repos.length >= 2) {
        this.getGithubInfo(repos[0], repos[1])
          .then(([repo, active]) => {
            this.loading = false

            this.data.created_at = data.created_at
            this.data.pushed_at = data.pushed_at
            this.data.stargazers_count = data.stargazers_count
            this.data.commits = []
            this.data.dates = []

            if (active.length) {
              this.data.commits = active.map(week => week.total)
              this.data.dates = active.map(week => this.getDateOfWeek(week.week))
            }

            this.data.properties = [{
              name: "网站",
              value: this.getHostName(data.homepage_url),
              src: data.homepage_url,
            }, {
              name: "项目地址",
              value: this.getHostName(data.repo_url),
              src: data.repo_url,
              count: repo.stargazers_count,
            }, {
              name: "初次提交",
              value: repo.created_at.replace("T"," ").replace("Z",""),
            }, {
              name: "上次提交",
              value: repo.pushed_at.replace("T"," ").replace("Z",""),
            }]
          })
          .catch(e => {
            this.loading = false
            this.data.dates = []
            this.data.commits = []
          })
      } else {
        this.loading = false
        this.data.dates = []
        this.data.commits = []
      }

      this.data.name = data.name
      this.data.description = data.description
      this.data.homepage_url = data.homepage_url
      this.data.logo = data.logo
      this.data.repo_url = data.repo_url
      this.data.tags = data.tags
    },
    getHostName: function(url){
      if(url){
        let u = new URL(url)
        return u.host.replace("www.","").replace(".org","")
      }
      return url
    },
    getDateOfWeek: function(w) {
      const d =  new Date(1602000000000 + w * 1000)
      const m = moment(d)
      return m.format("MMM")
    },
    dialogClosed: function() {
      this.loading = true
    }
  },
};
</script>
<style>
.product-dialog.el-dialog {
  padding: 40px;
  max-height: 540px;
  width: 90%;
  max-width: 840px;
  border-radius: 8px;
}
.product-dialog .el-dialog__body {
  padding: 0;
}
.product-dialog .el-dialog__header {
  display: none;
}

.detail_image_container {
  box-shadow:1px 1px 8px #999;
  width: 100%;
  position: relative;
  height: 150px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.detail_image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
}

.detail_tags_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.tags {
  display: inline-block;
  border-radius: 4px;
  padding: 4px 6px;
  background-color: #98cdff;
  margin-right: 10px;
  margin-top: 5px;
}

.tag_name {
  display: inline-block;
  font-weight: 600;
  font-size: 12px;
  margin-right: 6px;
  color: #222;
}

.tag_value {
  display: inline-block;
  font-size: 12px;
}

.detail_title {
  font-size: 2rem;
  line-height: 130%;
  margin: 0px;
}


.detail_category {
  margin: 0px;
  margin-top: 10px;
  color: #2e67bf;
}

.detail_description {
  font-size: 1rem;
  line-height: 130%;
  margin-bottom: .8rem;
  max-height: 300px;
  font-weight: 500;
  font-family: '宋体';
}

.el-form-item {
  margin-bottom: 0px !important;
}

.detail_sub_link {
  display: inline-block;
  text-decoration: none;
  color: #2e67bf;
}

.detail_sub {
  margin: 2rem 0;
}

.detail_star {
  display: inline-block;
  position: relative;
  left: 10px;
}

.product-dialog .el-dialog__body {
  padding: 0;
}



</style>
