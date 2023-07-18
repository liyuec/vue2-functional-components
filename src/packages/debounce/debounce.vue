<script>
    export default {
        name:'debunceComponet',
        functional:true,
        props:{
          eventName:{
            type:String,
            default:'click'
          },
          dealy:{
            type:Number,
            default:500
          },
          funcResult:{
            type:Function,
            default:null
          }
        },
         render(h,ctx){
            function  __debounce(fn,dealy,funcResult){
                let timer = 0,
                _dealy = dealy,
                _result = void 0;
                return function debounce(...args){
                  if(timer){
                    clearTimeout(timer)
                  }
                  timer = setTimeout(()=>{
                    console.log(args)
                    _result = fn.apply(this,args);
                    if(typeof funcResult === 'function'){
                      funcResult(_result)
                    }
                  }, _dealy);
                }
            }
      
            let vnode = ctx.slots().default[0],
            {
              eventName:_eventName,
              dealy:_propDealy,
              funcResult:_propFuncResult
            } = ctx.props;
      
           
            //native event
            if(!!vnode.data.on && !!vnode.data.on[_eventName]){
              let  _eleEvent = vnode.data.on[_eventName];
              vnode.data.on[_eventName] = __debounce(_eleEvent,_propDealy,_propFuncResult).bind(vnode.context)
            }else if(!!vnode.componentOptions.listeners[_eventName]){
              let _listenerEvent = vnode.componentOptions.listeners[_eventName];
              vnode.componentOptions.listeners[_eventName] = __debounce(_listenerEvent,_propDealy,_propFuncResult).bind(vnode.context)
            }
          return vnode
        }
    }
</script>