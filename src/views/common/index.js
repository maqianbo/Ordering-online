import Vue from "vue";
import "vant/lib/index.css";

//基础组件
import { Button } from "vant";
import { Cell, CellGroup } from "vant";
import { Row, Col } from "vant";
import { Icon } from "vant";
import { Image } from "vant";
import { Popup } from "vant";
//反馈组件
import { ActionSheet } from "vant";
import { Dialog } from "vant";
import { Toast } from "vant";
import { Overlay } from "vant";
import { SwipeCell } from "vant";
//表单组件
import { Form } from "vant";
import { Switch } from "vant";
import { Picker } from "vant";
import { DatetimePicker } from "vant";
//导航组件
import { Tabbar, TabbarItem } from "vant";
import { Grid, GridItem } from "vant";
import { NavBar } from "vant";
//展示组件
import { Divider } from "vant";
import { Card } from 'vant'
// 复选框
import { Checkbox, CheckboxGroup } from "vant";
import { Field } from "vant";
// 段选框
import { RadioGroup, Radio } from 'vant';
//展示组件
import { ImagePreview } from "vant";
//标签
import { Tag } from 'vant';

Vue.use(Button);
Vue.use(Cell).use(CellGroup);
Vue.use(Row).use(Col);
Vue.use(Icon);
Vue.use(Image);
Vue.use(Popup);
Vue.use(ActionSheet);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Overlay);
Vue.use(Switch);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Grid).use(GridItem);
Vue.use(NavBar);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Field);
Vue.use(ImagePreview);
Vue.use(SwipeCell);
Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(Form);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Card);
Vue.use(Tag);


