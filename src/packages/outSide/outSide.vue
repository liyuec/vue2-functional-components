<script>
    export default {
        name:'outSideComponent',
        abstract:true,
        props:{
        },
        mounted(){
          if(this.$slots.default === void 0){
            return;
          }
          this.onEvent = (function(){
              if(document.addEventListener){
                return function(el,event,hander,type){
                  el.addEventListener(event,hander,!!type)
                }
              }else{
                return function(el,event,hander){
                  el.attachEvent(`on${event}`,hander)
                }
              }
          })();
 

          this.removeEvent = (function(){
            if(document.removeEventListener){
              return function(el,event,hander,type){
                el.removeEventListener(event,hander,!!type)
              }
            }else{
              return function(el,event,hander){
                el.detachEvent(event,hander)
              }
            }
          })();

          let _vnode = this.$slots.default[0];

          this.outSideEl = _vnode.elm;

          this.addOutSide();

        },
        methods:{
          addOutSide(){
            if(!this.outSideEl){
              return;
            }

            this.onEvent(document,'click',this._outSideFunc,false)
          },
          _outSideFunc(e){
            let _target = e.target,
            el = this.outSideEl;

            if(!el.contains(e.target)){
              this.$emit('closeFunc')
            }
          },
          removeOutSide(){
            this.removeEvent(document,'click',this._outSideFunc,false)
          }
        },
        beforeDestroy(){
          this.removeOutSide()
        },
        render(h){
          if(this.$slots.default === void 0){
            return;
          }
          let _vnode =  this.$slots.default[0];
          return _vnode;
        }
    }
</script>