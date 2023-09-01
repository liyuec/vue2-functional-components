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
          },
          loading:{
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

          //保存对象
          this.$dropdownElem = _vnode.componentInstance.$el.querySelector(".el-cascader__dropdown");
          this._createPlaceholder();
        },
        methods:{
          _createPlaceholder(){
            let _d = document.createElement("div"),
            _style = "width:0px;height:0px;position:relative",
            _dId = `__d__${this._uid}`,
            _dropId = `__dropd__${this._uid}`;

            _d.id = _dId
            _d.style = _style;
            this.$el.appendChild(_d);

            let _dropd = document.createElement("div");
            _dropd.id = _dropId
            _dropd.style = _style;

            //保存在下级对象里
            this._dId = _dId;
            this._dropId = _dropId;

            this.$el.querySelector(".el-cascader__dropdown").appendChild(_dropd);


            function loadPlace(){
              if(!document.querySelector(`#${_dId}`)){
                setTimeout(()=>{
                  //console.log('settimeout')
                  loadPlace();
                },100)
              }else{
                this._createLoadingPlace(_dId);
                this._createLoadingPlace(_dropId);
              }
            }
            

            loadPlace.call(this);
           
          },
          _createLoadingPlace(_id){

            let mask = document.createElement("div"),
            loading = document.createElement("div"),
            id = `#${_id}`

            mask.id = `_mask_${_id}`;
            loading.id = `_loading_${_id}`;

            mask.className = '__transparentbg__'
            loading.className = '__loadingloader__'

            document.querySelector(id).appendChild(mask);
            document.querySelector(id).appendChild(loading);
          },
          firstNodeFunc(event){
              let checkboxValue = void 0,
              _node = void 0
              if(event.target.nodeName === 'SPAN' && event.target.className.indexOf('el-checkbox') > -1){
                //checkboxValue = event.target.parentNode.parentNode.__vue__.selfModel;
                checkboxValue = event.target.parentNode.className.indexOf('is-checked') > -1 ? false : true;
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
        watch:{
          loading:{
            handler(v,ov){
              if(v === ov){
                return;
              }

              setTimeout(()=>{
                let _dIdEl = document.querySelector(`#${this._dId}`),
                _dropIdEl = document.querySelector(`#${this._dropId}`),
                _dIdWidth = 0,_dIdHeight = 0,
                _dropIdWidth = 0,_dropIdHeight = 0;

                if(!!v){
                    if(!!_dIdEl){
                      let {width,height} = this.$el.getBoundingClientRect();
                      _dIdWidth = width;
                      _dIdHeight = height;
                    }

                    if(!!_dropIdEl){
                      let {width,height} = this.$dropdownElem.getBoundingClientRect();
                      _dropIdWidth = width;
                      _dropIdHeight = height;
                    }
                } 
                

                if(!!_dIdEl){
                    _dIdEl.querySelector(`#_mask_${this._dId}`).setAttribute("style", 
                    `
                    width:${_dIdWidth}px;height:${_dIdHeight}px;position:absolute;left:0px;top:-${_dIdHeight}px;z-index:100000;
                    display:${!!v ? 'block' : 'none'}
                    `)

                     _dIdEl.querySelector(`#_loading_${this._dId}`).setAttribute("style", 
                     `
                    position:absolute;left:${_dIdWidth/2}px;top:-${_dIdHeight/1.5}px;z-index:100000;
                     display:${!!v ? 'block' : 'none'}
                     `)
                }

                if(!!_dropIdEl){
                  _dropIdEl.querySelector(`#_mask_${this._dropId}`).setAttribute("style", `
                  width:${_dropIdWidth}px;height:${_dropIdHeight}px;position:absolute;left:0px;top:-${_dropIdHeight}px;z-index:100000;
                  display:${!!v ? 'block' : 'none'}`)

                   _dropIdEl.querySelector(`#_loading_${this._dropId}`).setAttribute("style", 
                   `
                   position:absolute;left:${_dropIdWidth/2}px;top:-${_dropIdHeight/2}px;z-index:100000;
                   display:${!!v ? 'block' : 'none'}
                   `);
                   
                }
              },100)
            },
            immediate:true
          }
        },
        render(h){
          let _vnode =  this.$slots.default[0];
          return _vnode;
        }
    }
</script>
<style>
.__loadingloader__ {
  width: 8px;
  height: 8px;
  border: 3px solid #ccc;
  border-top-color: #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.__transparentbg__ {
  background-color: rgba(255, 255, 255, 0.7);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>