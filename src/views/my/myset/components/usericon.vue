<template>
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :showCancelButton="false"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group>
      <van-cell title="从像册中选择" @click="openFile" is-link>
        <template slot="label">
          <div class="father">
            <input ref="myfile" style="display: none" class="son" id="file" type="file" />
          </div>
        </template>
      </van-cell>
      <van-cell title="拍照" is-link />
      <van-cell title="取消" @click="$emit('input', false)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
// 引入 ImagePreview 组件
import { ImagePreview } from 'vant'
import { setUserIcon } from '@/api/user'
export default {
  props: ["value"],
  data() {
    return {};
  },
  computed: {
    file: function() {
      return this.$refs["myfile"];
    }
  },
  methods: {
    openFile() {
      // 绑定一个事件：
      this.file.onchange = () => {
        // 得到图片
        let myfile = this.file.files[0];
        // 将 myfile 转为 base64 的图片
        let reader = new FileReader();
        // 设置转换为 base64 之后处理逻辑
        reader.addEventListener("load", res => {
          // 预览图片
          ImagePreview({
            images: [res.target.result],
            onClose: () => {
              this.$dialog
                .confirm({
                  title: "注意",
                  message: "是否需要将当前图片保存为头像"
                })
                .then(async () => {
                  let resData = await setUserIcon(this.file.files[0]);
                  this.$emit("changemyimg", resData);
                  this.$toast.success("头像修改成功");
                });
            }
          });
          // 关闭弹框
          this.$emit("input", false);
        });
        // 开始转换
        reader.readAsDataURL(myfile);
      };
      // 触发 myfile 的点击事件
      this.file.click();
    }
  }
};
</script>

<style>
</style>