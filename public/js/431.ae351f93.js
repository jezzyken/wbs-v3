"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[431],{250:function(t,e,s){s.r(e),s.d(e,{default:function(){return W}});var i=s(3740),a=s(3698),n=s(2938),r=s(3180),o=s(4414),l=s(3449),c=s(9483),d=s(6930),u=s(2756),m=s(7150),h=s(1034),p=s(5803),g=s(3381),v=s(4152),f=(0,p.A)(g.A).extend({name:"v-timeline",provide(){return{timeline:this}},props:{alignTop:Boolean,dense:Boolean,reverse:Boolean},computed:{classes(){return{"v-timeline--align-top":this.alignTop,"v-timeline--dense":this.dense,"v-timeline--reverse":this.reverse,...this.themeClasses}}},render(t){return t("div",{staticClass:"v-timeline",class:this.classes},(0,v.$c)(this))}}),y=(s(4114),s(569)),C=s(8743);const A=(0,p.A)(C.A,g.A);var _=A.extend().extend({name:"v-timeline-item",inject:["timeline"],props:{color:{type:String,default:"primary"},fillDot:Boolean,hideDot:Boolean,icon:String,iconColor:String,large:Boolean,left:Boolean,right:Boolean,small:Boolean},computed:{hasIcon(){return!!this.icon||!!this.$slots.icon}},methods:{genBody(){return this.$createElement("div",{staticClass:"v-timeline-item__body"},(0,v.$c)(this))},genIcon(){return(0,v.$c)(this,"icon")||this.$createElement(y.A,{props:{color:this.iconColor,dark:!this.theme.isDark,small:this.small}},this.icon)},genInnerDot(){const t=this.setBackgroundColor(this.color);return this.$createElement("div",{staticClass:"v-timeline-item__inner-dot",...t},[this.hasIcon&&this.genIcon()])},genDot(){return this.$createElement("div",{staticClass:"v-timeline-item__dot",class:{"v-timeline-item__dot--small":this.small,"v-timeline-item__dot--large":this.large}},[this.genInnerDot()])},genDivider(){const t=[];return this.hideDot||t.push(this.genDot()),this.$createElement("div",{staticClass:"v-timeline-item__divider"},t)},genOpposite(){return this.$createElement("div",{staticClass:"v-timeline-item__opposite"},(0,v.$c)(this,"opposite"))}},render(t){const e=[this.genBody(),this.genDivider()];return this.$slots.opposite&&e.push(this.genOpposite()),t("div",{staticClass:"v-timeline-item",class:{"v-timeline-item--fill-dot":this.fillDot,"v-timeline-item--before":this.timeline.reverse?this.right:this.left,"v-timeline-item--after":this.timeline.reverse?this.left:this.right,...this.themeClasses}},e)}}),b=function(){var t=this,e=t._self._c;return e(l.A,{attrs:{fluid:""}},[e(a.A,{staticClass:"mb-6 billing-card",attrs:{elevation:"2"}},[e(n.ri,{staticClass:"headline primary white--text py-4 d-flex justify-space-between align-center"},[e("div",{staticClass:"d-flex align-center"},[e(d.A,{staticClass:"mr-3",attrs:{large:"",color:"white"}},[t._v("mdi-file-document-outline")]),t._v(" Billing Statement ")],1),e(i.A,{staticClass:"header-pay-button",attrs:{color:"white",outlined:"",disabled:!t.statement.totalBill},on:{click:t.openPaymentDialog}},[e(d.A,{attrs:{left:""}},[t._v("mdi-cash-register")]),t._v(" Process Payment ")],1)],1),e(n.OQ,{staticClass:"pt-4"},[e(u.A,{staticClass:"consumer-info-section mb-6"},[e(o.A,{attrs:{cols:"12",md:"4"}},[e("div",{staticClass:"info-card pa-4"},[e("div",{staticClass:"caption grey--text"},[t._v("Consumer Name")]),e("div",{staticClass:"title font-weight-bold"},[t._v(" "+t._s(t.consumerData.consumerName)+" ")]),e(r.A,{staticClass:"mt-2",attrs:{small:"",color:"primary",outlined:""}},[t._v(" Account #"+t._s(t.consumerData.accountNo)+" ")])],1)]),e(o.A,{attrs:{cols:"12",md:"4"}},[e("div",{staticClass:"info-card pa-4"},[e("div",{staticClass:"caption grey--text"},[t._v("Billing Date")]),e("div",{staticClass:"title font-weight-bold"},[t._v(" "+t._s(t.consumerData.billingDate)+" ")]),e("div",{staticClass:"caption primary--text mt-2"},[e(d.A,{attrs:{small:"",color:"primary"}},[t._v("mdi-calendar")]),t._v(" Statement Generated ")],1)])]),e(o.A,{attrs:{cols:"12",md:"4"}},[e("div",{staticClass:"info-card pa-4"},[e("div",{staticClass:"caption grey--text"},[t._v("Due Date")]),e("div",{staticClass:"title font-weight-bold"},[t._v(" "+t._s(t.consumerData.dueDate)+" ")]),e("div",{staticClass:"caption error--text mt-2"},[e(d.A,{attrs:{small:"",color:"error"}},[t._v("mdi-alert-circle")]),t._v(" Please pay before due date ")],1)])])],1),e(a.A,{staticClass:"mb-6",attrs:{outlined:""}},[e(n.ri,{staticClass:"subtitle-1 grey lighten-4"},[e(d.A,{attrs:{left:"",color:"primary"}},[t._v("mdi-water")]),t._v(" Consumption Overview ")],1),e(n.OQ,[e(u.A,[e(o.A,{attrs:{cols:"12",md:"3"}},[e("div",{staticClass:"metric-card text-center pa-3"},[e("div",{staticClass:"caption grey--text mb-1"},[t._v("Previous Reading")]),e("div",{staticClass:"headline font-weight-bold"},[t._v(" "+t._s(t.readingData.previousRead)+" ")]),e("div",{staticClass:"caption"},[t._v(t._s(t.readingData.previousDate))])])]),e(o.A,{attrs:{cols:"12",md:"3"}},[e("div",{staticClass:"metric-card text-center pa-3"},[e("div",{staticClass:"caption grey--text mb-1"},[t._v("Present Reading")]),e("div",{staticClass:"headline font-weight-bold"},[t._v(" "+t._s(t.readingData.presentRead)+" ")]),e("div",{staticClass:"caption"},[t._v(t._s(t.readingData.presentDate))])])]),e(o.A,{attrs:{cols:"12",md:"3"}},[e("div",{staticClass:"metric-card text-center pa-3"},[e("div",{staticClass:"caption grey--text mb-1"},[t._v("Consumption")]),e("div",{staticClass:"headline font-weight-bold primary--text"},[t._v(" "+t._s(t.readingData.consumption)+" ")]),e("div",{staticClass:"caption"},[t._v("Cubic Meters")])])]),e(o.A,{attrs:{cols:"12",md:"3"}},[e("div",{staticClass:"metric-card text-center pa-3"},[e("div",{staticClass:"caption grey--text mb-1"},[t._v("Meter Status")]),e(r.A,{attrs:{small:"",color:t.getMeterStatusColor(t.readingData.readType)}},[t._v(" "+t._s(t.readingData.readType)+" ")]),e("div",{staticClass:"caption mt-1"},[t._v(" "+t._s(t.readingData.meterDescription)+" ")])],1)])],1)],1)],1),e("div",{staticClass:"d-flex align-center mb-4"},[e("h3",{staticClass:"text-h6 font-weight-bold grey--text text--darken-2"},[e(d.A,{attrs:{left:""}},[t._v("mdi-history")]),t._v(" Billing History ")],1),e(h.A)],1),e(a.A,{staticClass:"billing-history-card",attrs:{outlined:""}},[e(n.OQ,{staticClass:"pa-0"},[e(f,{attrs:{dense:""}},t._l(t.consumers,(function(s,i){return e(_,{key:i,attrs:{color:"Paid"===s.status?"success":"error",small:""}},[e("div",{staticClass:"d-flex justify-space-between align-center pr-5"},[e("div",[e("div",{staticClass:"subtitle-1 font-weight-medium"},[t._v(" "+t._s(s.billingDate)+" ")]),e("div",{staticClass:"caption grey--text"},[t._v(" Consumption: "+t._s(s.consumption)+" cubic meters ")])]),e("div",{staticClass:"text-right"},[e(r.A,{attrs:{"x-small":"",color:"Paid"===s.status?"success":"error","text-color":(s.status,"white")}},[t._v(" "+t._s(s.status)+" ")]),e("div",{staticClass:"caption mt-1"},[t._v(" Reading: "+t._s(s.previousRead)+" → "+t._s(s.presentRead)+" ")])],1)])])})),1)],1)],1)],1)],1),e(u.A,[e(o.A,{attrs:{cols:"12",md:"12"}},[e(a.A,{staticClass:"summary-card",attrs:{elevation:"2"}},[e(n.ri,{staticClass:"primary white--text"},[e(d.A,{attrs:{left:"",color:"white"}},[t._v("mdi-receipt")]),t._v(" Bill Summary ")],1),e(n.OQ,{staticClass:"pa-6"},[e(u.A,[e(o.A,{attrs:{cols:"12",md:"4"}},[e("div",{staticClass:"charge-item"},[e("div",{staticClass:"caption grey--text"},[t._v("Present Bill")]),e("div",{staticClass:"title font-weight-medium"},[t._v(" ₱"+t._s(t.formatAmount(t.statement.presentBill))+" ")])])]),e(o.A,{attrs:{cols:"12",md:"4"}},[e("div",{staticClass:"charge-item"},[e("div",{staticClass:"caption grey--text"},[t._v("Previous Balance")]),e("div",{staticClass:"title font-weight-medium"},[t._v(" ₱"+t._s(t.formatAmount(t.statement.previousBalance))+" ")])])]),e(o.A,{attrs:{cols:"12",md:"4"}},[e("div",{staticClass:"charge-item"},[e("div",{staticClass:"caption grey--text"},[t._v("Other Charges")]),e("div",{staticClass:"title font-weight-medium"},[t._v("₱0")])])])],1),e(c.A,{staticClass:"my-6"}),e("div",{staticClass:"d-flex justify-space-between align-center"},[e("div",{staticClass:"text-h6 font-weight-bold"},[t._v("Total Amount Due")]),e("div",{staticClass:"text-h4 primary--text font-weight-bold"},[t._v(" ₱"+t._s(t.formatAmount(t.statement.totalBill))+" ")])])],1)],1)],1)],1),e("payment-dialog",{attrs:{show:t.showPaymentDialog,"total-amount":t.statement.totalBill,loading:t.isLoading},on:{cancel:function(e){t.showPaymentDialog=!1},confirm:t.handlePaymentConfirm}}),e(m.A,{attrs:{color:t.snackbar.color,timeout:3e3,top:""},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(i.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar.show=!1}}},"v-btn",s,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar.show,callback:function(e){t.$set(t.snackbar,"show",e)},expression:"snackbar.show"}},[e(d.A,{attrs:{left:""}},[t._v(t._s(t.snackbar.icon))]),t._v(" "+t._s(t.snackbar.text)+" ")],1)],1)},D=[],x=s(5093),w=s.n(x),B=s(1988),P=s(1965),S=s(9991),$=s(8983),k=s(7296),E=s(301),I=s(7112),R=function(){var t=this,e=t._self._c;return e(S.A,{attrs:{"max-width":"500"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[e(a.A,[t.showConfirmation?[e(n.ri,{staticClass:"headline primary white--text"},[e(d.A,{attrs:{left:"",color:"white"}},[t._v("mdi-cash-check")]),t._v(" Confirm Payment ")],1),e(n.OQ,{staticClass:"pt-4"},[e($.A,[e(k.A,[e(E.pr,[e(E.w,[t._v("Amount Due")]),e(E.UZ,{staticClass:"font-weight-bold"},[t._v(" ₱"+t._s(t.formatAmount(t.totalAmount))+" ")])],1)],1),e(k.A,[e(E.pr,[e(E.w,[t._v("Cash Payment")]),e(E.UZ,{staticClass:"font-weight-bold"},[t._v(" ₱"+t._s(t.formatAmount(t.cashAmount))+" ")])],1)],1),e(k.A,[e(E.pr,[e(E.w,[t._v("Change")]),e(E.UZ,{staticClass:"font-weight-bold"},[t._v(" ₱"+t._s(t.formatAmount(t.changeAmount))+" ")])],1)],1)],1),e(P.A,{staticClass:"mt-4",attrs:{type:"warning",dense:""}},[t._v(" Please verify the payment details before confirming. ")])],1),e(c.A),e(n.SL,{staticClass:"pa-4"},[e(h.A),e(i.A,{attrs:{text:""},on:{click:function(e){t.showConfirmation=!1}}},[t._v(" Back ")]),e(i.A,{attrs:{color:"primary",loading:t.loading},on:{click:t.onConfirm}},[t._v(" Confirm Payment ")])],1)]:[e(n.ri,{staticClass:"headline primary white--text"},[e(d.A,{attrs:{left:"",color:"white"}},[t._v("mdi-cash-register")]),t._v(" Payment Details ")],1),e(n.OQ,{staticClass:"pa-6"},[e(u.A,[e(o.A,{attrs:{cols:"12"}},[e("div",{staticClass:"amount-display mb-6"},[e("div",{staticClass:"text-h6 grey--text text--darken-1"},[t._v("Total Amount Due")]),e("div",{staticClass:"text-h3 primary--text font-weight-bold"},[t._v(" ₱"+t._s(t.formatAmount(t.totalAmount))+" ")])]),e(I.A,{staticClass:"mb-4",attrs:{label:"Enter Cash Amount",type:"number",filled:"",dense:"",prefix:"₱",rules:[t=>t>0||"Please enter a valid amount",e=>e>=t.totalAmount||"Amount is insufficient"]},on:{input:t.calculateChange},model:{value:t.cashAmount,callback:function(e){t.cashAmount=t._n(e)},expression:"cashAmount"}}),t.changeAmount>0?e("div",{staticClass:"change-display pa-4 mb-4"},[e("div",{staticClass:"d-flex justify-space-between align-center"},[e("span",{staticClass:"text-subtitle-1"},[t._v("Change Due:")]),e("span",{staticClass:"text-h5 success--text font-weight-bold"},[t._v(" ₱"+t._s(t.formatAmount(t.changeAmount))+" ")])])]):t._e()],1)],1)],1),e(c.A),e(n.SL,{staticClass:"pa-4"},[e(h.A),e(i.A,{attrs:{text:""},on:{click:t.onCancel}},[t._v(" Cancel ")]),e(i.A,{attrs:{color:"primary",disabled:!t.isPaymentValid},on:{click:function(e){t.showConfirmation=!0}}},[e(d.A,{attrs:{left:""}},[t._v("mdi-check-circle")]),t._v(" Review Payment ")],1)],1)]],2)],1)},N=[],T={name:"PaymentDialog",props:{show:Boolean,totalAmount:Number,loading:Boolean},data(){return{cashAmount:0,changeAmount:0,showConfirmation:!1}},computed:{isPaymentValid(){return this.cashAmount>=this.totalAmount}},methods:{calculateChange(){this.changeAmount=Math.max(this.cashAmount-this.totalAmount,0)},formatAmount(t){return Number(t).toLocaleString("en-PH",{minimumFractionDigits:2,maximumFractionDigits:2})},onCancel(){this.$emit("cancel"),this.resetForm()},onConfirm(){this.$emit("confirm",{cashAmount:this.cashAmount,changeAmount:this.changeAmount})},resetForm(){this.cashAmount=0,this.changeAmount=0,this.showConfirmation=!1}},watch:{show(t){t||this.resetForm()}}},M=T,O=s(1656),j=(0,O.A)(M,R,N,!1,null,"06ffa7ae",null),Y=j.exports,L={name:"BillingForm",components:{PaymentDialog:Y},data(){return{consumers:[],currentBilling:null,cashAmount:0,consumerColumns:[{text:"CONSUMER NAME",value:"consumerName",align:"left"},{text:"BILLING DATE",value:"billingDate",align:"center"},{text:"DUE DATE",value:"dueDate",align:"center"}],readingColumns:[{text:"PREVIOUS DATE",value:"previousDate",align:"center"},{text:"PREVIOUS READ",value:"previousRead",align:"center"},{text:"PRESENT DATE",value:"presentDate",align:"center"},{text:"PRESENT READ",value:"presentRead",align:"center"},{text:"CONSUMPTION (IN CUBIC)",value:"consumption",align:"center"},{text:"READ TYPE",value:"readType",align:"center"},{text:"METER DESCRIPTION",value:"meterDescription",align:"center"}],columns:[{text:"Billing Date",value:"billingDate",align:"left"},{text:"Previous Read",value:"previousRead",align:"left"},{text:"Present Read",value:"presentRead",align:"left"},{text:"Consumption",value:"consumption",align:"left"},{text:"Payment Status",value:"status",align:"left"}],statement:{},isLoading:!1,confirmDialog:!1,snackbar:{show:!1,text:"",color:""},showPaymentDialog:!1}},computed:{consumerData(){return this.currentBilling?{consumerName:this.currentBilling.name,accountNo:this.currentBilling.accountNo,billingDate:w()(this.currentBilling.billingDate).format("YYYY-MM-DD"),dueDate:w()(this.currentBilling.dueDate).format("YYYY-MM-DD")}:{}},readingData(){return this.currentBilling?{previousDate:w()(this.currentBilling.previousDate).format("YYYY-MM-DD"),previousRead:this.currentBilling.previousRead,presentDate:w()(this.currentBilling.presentDate).format("YYYY-MM-DD"),presentRead:this.currentBilling.presentRead,consumption:this.currentBilling.consumption,readType:this.currentBilling.readType,meterDescription:this.currentBilling.meterDescription}:{}},totalAmountPayable(){return this.currentBilling?(this.currentBilling.presentBill||0)+(this.currentBilling.previousBalance||0)+(this.currentBilling.otherCharges||0):0},changeAmount(){return Math.max(this.cashAmount-this.totalAmountPayable,0).toFixed(2)},isPaymentValid(){return this.cashAmount>=this.totalAmountPayable}},methods:{async fetch(){try{const t=await B.A.get(`/billing/consumer/all/${this.$route.params.id}`);this.consumers=t.data.map((t=>({...t,billingDate:w()(t.billingDate).format("YYYY-MM-DD")}))),this.statement=this.generateBillingStatement(t.data),this.consumers.length>0&&(this.currentBilling=this.consumers[0],this.currentBilling.name=`${this.currentBilling.consumerId.firstName} ${this.currentBilling.consumerId.middleName} ${this.currentBilling.consumerId.lastName}`)}catch(t){console.error("Error fetching billing data:",t)}},onViewItem(t){this.$router.push(`/consumer/${t._id}/view`)},generateBillingStatement(t){t.sort(((t,e)=>new Date(e.billingDate)-new Date(t.billingDate)));const e=t[0];let s=0,i=0,a=!1;t.forEach((t=>{"Unpaid"===t.status&&(a=!0,s+=t.presentBill,t._id.toString()!==e._id.toString()&&(i+=t.presentBill))}));const n=a?e.presentBill:0;return{previousDate:e.previousDate,previousRead:e.previousRead,presentDate:e.presentDate,presentRead:e.presentRead,consumption:e.consumption,readType:e.readType,meterDescription:e.meterDescription,presentBill:n,totalBill:s,previousBalance:i}},async confirmPaymentAction(){try{this.isLoading=!0;const t=this.consumers.filter((t=>"Paid"!==t.status)).map((t=>t._id)),e={billId:t,consumerId:this.$route.params.id,totalBill:this.totalAmountPayable,amountPaid:this.cashAmount,change:this.changeAmount,paymentMethod:"Cash",collectionType:"Water Bill",paymentDate:new Date};await B.A.post("/collection",e),this.showSnackbar("Payment processed successfully!","success"),this.confirmDialog=!1,this.onCompletePayment()}catch(t){console.error("Payment processing error:",t),this.showSnackbar("Failed to process payment","error")}finally{this.isLoading=!1}},formatAmount(t){return Number(t).toLocaleString("en-PH",{minimumFractionDigits:2,maximumFractionDigits:2})},getMeterStatusColor(t){const e={Normal:"success",Warning:"warning",Critical:"error",default:"grey"};return e[t]||e.default},calculateChange(){this.changeAmount=Math.max(this.cashAmount-this.totalAmountPayable,0).toFixed(2)},showSnackbar(t,e="success"){this.snackbar={show:!0,text:t,color:e,icon:"success"===e?"mdi-check-circle":"mdi-alert-circle"}},openPaymentDialog(){this.showPaymentDialog=!0},async handlePaymentConfirm(t){try{this.isLoading=!0;const e=this.consumers.filter((t=>"Paid"!==t.status)).map((t=>t._id)),s={billId:e,consumerId:this.$route.params.id,totalBill:this.statement.totalBill,amountPaid:t.cashAmount,change:t.changeAmount,paymentMethod:"Cash",collectionType:"Water Bill",paymentDate:new Date};await B.A.post("/collection",s),this.showSnackbar("Payment processed successfully!","success"),this.showPaymentDialog=!1,this.onCompletePayment()}catch(e){console.error("Payment processing error:",e),this.showSnackbar("Failed to process payment","error")}finally{this.isLoading=!1}},onCompletePayment(){this.$router.push({name:"billings"})}},created(){this.fetch()}},F=L,U=(0,O.A)(F,b,D,!1,null,"578036da",null),W=U.exports},1965:function(t,e,s){s.d(e,{A:function(){return h}});var i=s(9375),a=s(4728),n=s(569),r=s(428),o=s(3381),l=s(5471),c=l.Ay.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),d=s(5803),u=s(6988),m=s(4152),h=(0,d.A)(i.A,r.A,c).extend({name:"v-alert",props:{border:{type:String,validator(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let t={staticClass:"v-alert__border",class:{[`v-alert__border--${this.border}`]:!0}};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible(){if(!this.dismissible)return null;const t=this.iconColor;return this.$createElement(a.A,{staticClass:"v-alert__dismissible",props:{color:t,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(n.A,{props:{color:t}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(n.A,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const t={...i.A.options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(t[`v-alert--border-${this.border}`]=!0),t},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&`$${this.type}`)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||o.A.options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&(0,u.q4)("outline","outlined",this)},methods:{genWrapper(){const t=[(0,m.$c)(this,"prepend")||this.__cachedIcon,this.genContent(),this.__cachedBorder,(0,m.$c)(this,"append"),this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},(0,m.$c)(this))},genAlert(){let t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){const e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(t){const e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},4728:function(t,e,s){var i=s(3740);e.A=i.A},4414:function(t,e,s){s(4114),s(125);var i=s(5471),a=s(8041),n=s(4152);const r=["sm","md","lg","xl"],o=(()=>r.reduce(((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t)),{}))(),l=(()=>r.reduce(((t,e)=>(t["offset"+(0,n.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),c=(()=>r.reduce(((t,e)=>(t["order"+(0,n.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),d={col:Object.keys(o),offset:Object.keys(l),order:Object.keys(c)};function u(t,e,s){let i=t;if(null!=s&&!1!==s){if(e){const s=e.replace(t,"");i+=`-${s}`}return"col"!==t||""!==s&&!0!==s?(i+=`-${s}`,i.toLowerCase()):i.toLowerCase()}}const m=new Map;e.A=i.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...o,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:s,children:i,parent:n}){let r="";for(const a in e)r+=String(e[a]);let o=m.get(r);if(!o){let t;for(t in o=[],d)d[t].forEach((s=>{const i=e[s],a=u(t,s,i);a&&o.push(a)}));const s=o.some((t=>t.startsWith("col-")));o.push({col:!s||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),m.set(r,o)}return t(e.tag,(0,a.Ay)(s,{class:o}),i)}})},3449:function(t,e,s){s.d(e,{A:function(){return r}});s(158),s(125);var i=s(5471);function a(t){return i.Ay.extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:s,data:i,children:a}){i.staticClass=`${t} ${i.staticClass||""}`.trim();const{attrs:n}=i;if(n){i.attrs={};const t=Object.keys(n).filter((t=>{if("slot"===t)return!1;const e=n[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}));t.length&&(i.staticClass+=` ${t.join(" ")}`)}return s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),e(s.tag,i,a)}})}var n=s(8041),r=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:s,children:i}){let a;const{attrs:r}=s;return r&&(s.attrs={},a=Object.keys(r).filter((t=>{if("slot"===t)return!1;const e=r[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}))),e.id&&(s.domProps=s.domProps||{},s.domProps.id=e.id),t(e.tag,(0,n.Ay)(s,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(a||[])}),i)}})},2756:function(t,e,s){s(4114),s(125);var i=s(5471),a=s(8041),n=s(4152);const r=["sm","md","lg","xl"],o=["start","end","center"];function l(t,e){return r.reduce(((s,i)=>(s[t+(0,n.Zb)(i)]=e(),s)),{})}const c=t=>[...o,"baseline","stretch"].includes(t),d=l("align",(()=>({type:String,default:null,validator:c}))),u=t=>[...o,"space-between","space-around"].includes(t),m=l("justify",(()=>({type:String,default:null,validator:u}))),h=t=>[...o,"space-between","space-around","stretch"].includes(t),p=l("alignContent",(()=>({type:String,default:null,validator:h}))),g={align:Object.keys(d),justify:Object.keys(m),alignContent:Object.keys(p)},v={align:"align",justify:"justify",alignContent:"align-content"};function f(t,e,s){let i=v[t];if(null!=s){if(e){const s=e.replace(t,"");i+=`-${s}`}return i+=`-${s}`,i.toLowerCase()}}const y=new Map;e.A=i.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...m,alignContent:{type:String,default:null,validator:h},...p},render(t,{props:e,data:s,children:i}){let n="";for(const a in e)n+=String(e[a]);let r=y.get(n);if(!r){let t;for(t in r=[],g)g[t].forEach((s=>{const i=e[s],a=f(t,s,i);a&&r.push(a)}));r.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),y.set(n,r)}return t(e.tag,(0,a.Ay)(s,{staticClass:"row",class:r}),i)}})},1034:function(t,e,s){s(158);var i=s(4152);e.A=(0,i.Gn)("spacer","div","v-spacer")},158:function(){}}]);
//# sourceMappingURL=431.ae351f93.js.map