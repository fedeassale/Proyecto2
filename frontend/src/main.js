import { createApp } from 'vue'
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router/router.js'

// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from "@primeuix/themes/aura";
import 'primeicons/primeicons.css';
import './style.css';
import ToastService from 'primevue/toastservice';


const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(PrimeVue, {
	theme: {
		preset: Aura,
	},
});
app.use(ToastService);

// PrimeVue Components
import Carousel from "primevue/carousel";
import Tag from "primevue/tag";
import MultiSelect from "primevue/multiselect";
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import TreeTable from 'primevue/treetable';
import Button from "primevue/button"
import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Skeleton from 'primevue/skeleton';
import Ripple from 'primevue/ripple';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import ColumnGroup from 'primevue/columngroup';
import ToggleButton from 'primevue/togglebutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row'; 
import { Form } from '@primevue/forms';
import Drawer from 'primevue/drawer';
import { FormField } from '@primevue/forms';
app.component('Carousel', Carousel);
app.component('Tag', Tag);
app.component('MultiSelect', MultiSelect);
app.component('DatePicker', DatePicker);
app.component('Textarea', Textarea);
app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('TreeTable', TreeTable);
app.component('Menubar',Menubar);
app.component('Badge',Badge);
app.component('Avatar',Avatar);
app.component('InputText',InputText);
app.component('Skeleton',Skeleton);
app.component('Form',Form);
app.component('Drawer',Drawer);
app.component('Accordion',Accordion);
app.component('AccordionPanel',AccordionPanel);
app.component('AccordionHeader',AccordionHeader);
app.component('AccordionContent',AccordionContent);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('ToggleButton', ToggleButton);
app.directive('Ripple', Ripple);
app.directive('Form', Form);
app.component('FormField', FormField);

app.mount("#app");
