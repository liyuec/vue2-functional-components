<script>
    export default {
        name:'elementOmit',
        abstract:true,
        props:{
          eltype:{
            type:String,
            default:'ElCascader'
          },
          omitMaxWidth:{
            type:Number,
            default:0
          },
          omitClassName:{
            type:Array,
            default:()=>{
              return ['.el-cascader-node__label']
            }
          },
          omitHander:{
            type:String,
            default:'',
            validator(val) {
              return ['hover',''].indexOf(val) !== -1;
            }
          },
          dealy:{
            type:Number,
            default:200
          }
        },
        render(h){
          let _vnode =  this.$slots.default[0];
          return _vnode;
        },
        mounted(){
          let _vnode = this.$slots.default[0];
          if(!!this.omitHander){
              switch(this.eltype){
                case 'ElCascader':
                  this.ElCascaderMounted(_vnode);
                  break;
                default:
                  this.ElCascaderMounted(_vnode);
                  break;    
              }
          }
         
          switch(this.eltype){
              case 'ElCascader':
               this.addElCasecaderOmitStyle();
              break;
            default:
               this.addElCasecaderOmitStyle();
              break;    
          }
         
        },
        update(){
        },
        beforeDestroy(){
          if(!!this._obServerInput){
            this._obServerInput.disconnect();
          }

          if(!!this._obServerDown){
            this._obServerDown.disconnect();
          }

          this.removeElCasecaderOmitStyle();
        },
        methods:{
          addElCasecaderOmitStyle(){
              if(!this.omitMaxWidth){
                return;
              }

              let _stylesCss =  `${this.omitClassName[0]}{max-width:${this.omitMaxWidth}px;}`,
              _style = document.createElement("style");

              _style.id = `_omit_${this._uid}`;
              _style.innerHTML = _stylesCss;
              document.head.appendChild(_style)
          },
          removeElCasecaderOmitStyle(){
            if(!this.omitMaxWidth){
                return;
            }

            let _id =  `#_omit_${this._uid}`;
            document.querySelector(_id).remove();
          },
          ElCascaderMounted(_vnode){
            this._elCascaderDown = _vnode.componentInstance.$el.querySelector('.el-cascader__dropdown');
            this._elInput = _vnode.componentInstance.$el;

            this._obServerInput = void 0;
            this._obServerDown = void 0;
            function observerInputCB(){
              this._elInput.querySelectorAll(".el-tag").forEach(el=>{
                  el.setAttribute('title',el.textContent)
               })

              //如果是Input
              let _elemInput = this._elInput.querySelector("input");
              if(!!_elemInput){
                let _value = _elemInput.value;
                _elemInput.setAttribute('title',_value);
              }
              this._elInput.querySelector("input").value
            }

            function observerDownCB(){
               this._elCascaderDown.querySelectorAll(".el-cascader-node__label").forEach(el=>{
                  el.setAttribute('title',el.textContent)
               })
            }

            let obOptions = {
              childList: true, // 观察目标子节点的变化，是否有添加或者删除
              subtree: true  // 观察后代节点，默认为 false
            }


            this._obServerInput = new MutationObserver(this.debounce(observerInputCB.bind(this)));
            this._obServerInput.observe(this._elInput, obOptions);
            this._obServerDown = new MutationObserver(this.debounce(observerDownCB.bind(this)));
            this._obServerDown.observe(this._elCascaderDown,obOptions)
          },
          debounce(fn){
            let _dealy = this.dealy,
            _timer = null;

            return function __debounce(){
              if(!!_timer){
                clearTimeout(_timer)
              }
               _timer = setTimeout(fn,_dealy);
            }

          }
        }
    }
</script>