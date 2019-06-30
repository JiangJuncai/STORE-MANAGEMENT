<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show" @open="beforeDialogOpen">
    <el-form :model="profileForm" ref="profileForm" :rules="profileRules">
      <el-tabs tab-position="left">
        <el-tab-pane label="日常配置">
          <el-form-item prop="date" label="日期" label-width="80px">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="profileForm.date"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="isMarket" label="集会日" label-width="80px">
            <el-radio-group v-model="profileForm.isMarket">
              <el-radio :label="false" border size="small">否</el-radio>
              <el-radio :label="true" border size="small">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="duckCount" label="售出烤鸭" label-width="80px">
            <el-input
              type="number"
              v-model.number="profileForm.duckCount"
              placeholder="请输入数量"
              clearable
            >
              <template slot="append">只</template>
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="流水金额">
          <el-form-item prop="income" label="营业额" label-width="80px">
            <el-input
              type="number"
              v-model.number="profileForm.income"
              placeholder="请输入金额"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="foodsExpend" label="进货支出" label-width="80px">
            <el-input
              type="number"
              v-model.number="profileForm.foodsExpend"
              placeholder="请输入金额"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="frozenExpend" label="冻鸭支出" label-width="80px">
            <el-input
              type="number"
              v-model.number="profileForm.frozenExpend"
              placeholder="请输入金额"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="otherExpend" label="其它支出" label-width="80px">
            <el-input
              type="number"
              v-model.number="profileForm.otherExpend"
              placeholder="请输入金额"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="profit" label="日利润" label-width="80px">
            <el-input type="number" v-model.number="profit" placeholder="请输入金额" clearable></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="备注">
          <el-form-item prop="remark" label="备注" label-width="60px">
            <el-input
              type="textarea"
              :rows="4"
              v-model.number="profileForm.remark"
              placeholder="请输入内容"
              clearable
            ></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.show = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('profileForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'profile-dialog',
  data() {
    return {
      profileRules: {
        date: [
          {
            type: 'string',
            required: true,
            message: '请选择时间',
            triggle: 'blur'
          }
        ],
        isMarket: [
          {
            type: 'boolean',
            required: true,
            message: '请选择是否集会日',
            triggle: 'blur'
          }
        ],
        duckCount: [
          {
            type: 'number',
            required: true,
            message: '请输入卖出烤鸭的只数',
            triggle: 'blur'
          }
        ],
        income: [
          {
            type: 'number',
            required: true,
            message: '请输入营业额',
            triggle: 'change'
          }
        ],
        foodsExpend: [
          {
            type: 'number',
            message: '请输入数字',
            triggle: 'change'
          }
        ],
        frozenExpend: [
          {
            type: 'number',
            message: '请输入数字',
            triggle: 'change'
          }
        ],
        otherExpend: [
          {
            type: 'number',
            message: '请输入数字',
            triggle: 'change'
          }
        ],
        profit: [
          {
            type: 'number',
            required: true,
            message: '日利润不能为空',
            triggle: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    profileForm: {
      get: function() {
        return this.profile;
      },
      set: function(val) {}
    },
    profit: {
      get: function() {
        return (
          this.profileForm.income -
          this.profileForm.foodsExpend -
          this.profileForm.frozenExpend -
          this.profileForm.otherExpend
        );
      },
      set: function(val) {}
    }
  },
  props: {
    dialog: Object,
    profile: Object
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.profileForm.profit = this.profit;
          if (this.dialog.option == 'add') {
            this.$axios.post(`/profiles/add`, this.profileForm).then(res => {
              this.$message.success(res.data);
              this.dialog.show = false;
              this.$emit('update');
            });
          } else {
            this.$axios
              .put(`/profiles/edit/${this.profile._id}`, this.profileForm)
              .then(res => {
                this.$message.success(res.data);
                this.dialog.show = false;
                this.$emit('update');
              });
          }
        } else {
          this.$message.error('表单填写错误');
        }
      });
    },
    beforeDialogOpen() {
      if (this.dialog.option == 'add' && this.$refs['profileForm']) {
        this.$refs['profileForm'].resetFields();
      }
    }
  }
};
</script>
