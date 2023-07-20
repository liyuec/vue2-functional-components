<script>
    export default {
        name:'throttleComponet',
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
            function  __throttle(fn,dealy,funcResult){
                let timer = 0,
                timeBegin = 0,
                _dealy = dealy,
                _result = void 0;
                return function throttle(...args){
                  if(!timeBegin){
                    timeBegin = Date.now();
                  }
                  if(Date.now() - timeBegin > _dealy){
                    _result = fn.apply(this,args);
                    if(typeof funcResult === 'function'){
                      funcResult(_result)
                    }
                    clearTimeout(timer)
                    timeBegin = 0;
                  }else{
                    clearTimeout(timer);
                    timer = setTimeout(()=>{
                        _result = fn.apply(this,args);
                        if(typeof funcResult === 'function'){
                          funcResult(_result)
                        }
                        timeBegin = 0;
                    },_dealy)
                  }
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
              vnode.data.on[_eventName] = __throttle(_eleEvent,_propDealy,_propFuncResult).bind(vnode.context)
            }else if(!!vnode.componentOptions.listeners[_eventName]){
              let _listenerEvent = vnode.componentOptions.listeners[_eventName];
              vnode.componentOptions.listeners[_eventName] = __throttle(_listenerEvent,_propDealy,_propFuncResult).bind(vnode.context)
            }
          return vnode
        }
    }
</script>