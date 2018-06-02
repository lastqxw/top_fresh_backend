<style lang="less">
</style>

<template>
    <div>
        <Row>
            <Col span="18">
                <Card>
                    <Form :label-width="80">
                        <FormItem label="订单号" :error="articleError">
                            <Input v-model="input" @on-blur="handleArticletitleBlur" icon="android-list" />
                        </FormItem>
                        <FormItem label="商品名称" :error="articleError">
                            <Input v-model="input" @on-blur="handleArticletitleBlur" icon="android-list" />
                        </FormItem>
                        <FormItem label="联系人" :error="articleError">
                            <Input v-model="input" @on-blur="handleArticletitleBlur" icon="android-list" />
                        </FormItem>
                        <FormItem label="收货地址" :error="articleError">
                            <Input v-model="input" @on-blur="handleArticletitleBlur" icon="android-list" />
                        </FormItem>
                        <FormItem label="状态" :error="articleError">
                            <Input v-model="input" @on-blur="handleArticletitleBlur" icon="android-list" />
                        </FormItem>
                        <FormItem label="下单时间" :error="articleError">
                            <Input v-model="input" @on-blur="handleArticletitleBlur" icon="android-list" />
                        </FormItem>
                        <Row class="margin-top-20 publish-button-con">
                            <span class="publish-button">
                                <Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="warning">取消</Button>
                            </span>
                            <span class="publish-button">
                                <Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="error">更新</Button>
                            </span>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            formItem: {
                input: ''
            }
        };
    }
};
</script>
