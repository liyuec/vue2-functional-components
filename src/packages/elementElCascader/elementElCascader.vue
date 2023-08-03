<script>
    export default {
        name:'elementElCascader',
        abstract:true,
        data(){
          return {
            throttle:0,
            timeBegin:0
          }
        },
        props:{
          everyCloseable:{
            type:Boolean
          },
          dealy:{
            type:Number,
            default:200
          },
          handleClearFunc:{
            type:Function,
            default:null
          },
          firstClickNode:{
            type:Boolean,
            default:false
          }
        },
        mounted(){
          let _vnode = this.$slots.default[0],
          _cascaderHandleClear = _vnode.componentInstance.handleClear,
          _handleClearFunc = this.handleClearFunc;

          if(typeof _handleClearFunc === 'function'){
              _vnode.componentInstance.handleClear = function(){
              _cascaderHandleClear();
              _handleClearFunc();
            } 
          }
          if(this.firstClickNode){
            _vnode.componentInstance.$el.querySelector(".el-cascader__dropdown").addEventListener("click",this.firstNodeFunc,true)
          }
        },
        methods:{
          firstNodeFunc(event){
              let checkboxValue = void 0,
              _node = void 0
              if(event.target.nodeName === 'SPAN' && event.target.className.indexOf('el-checkbox') > -1){
                checkboxValue = event.target.parentNode.parentNode.__vue__.selfModel;
                _node = event.target.parentNode.parentNode.parentNode.__vue__.node;
                 //console.log(checkboxValue,_node)
              }
              queueMicrotask(()=>{
                  this.$emit('firstNodeBind', {
                  checkboxValue:checkboxValue,
                  label:!!_node ? _node.label : "",
                  value:!!_node ? _node.value : ""
                })
              })
          }
        },
        updated(){
          let _vnode = this.$slots.default[0],
          _dealy  = this.dealy;
          if(this.everyCloseable){
            
            if(!this.timeBegin){
              this.timeBegin = Date.now();
            }

            if(Date.now() - this.timeBegin > _dealy){
              clearTimeout(this.throttle)
              this.timeBegin = 0;
               _vnode.componentInstance.presentTags.forEach(i=>{
                  i.closable = true;
                })
            }else{
              clearTimeout(this.throttle)
              this.throttle = setTimeout(() => {
                  _vnode.componentInstance.presentTags.forEach(i=>{
                    i.closable = true;
                  })
                  this.timeBegin = 0;
                }, _dealy);
              }
          }
        },
        render(h){
          let _vnode =  this.$slots.default[0];
          return _vnode;
        }
    }
</script>