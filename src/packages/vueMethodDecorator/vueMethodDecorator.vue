<script>
    export default {
        name: 'vueMethodDecorator',
        abstract:true,
        props:{
            /*
                name:{String}
                functionResult:{Function}
                type:{String}   :'d'表示 debounce  't'表示throttle     默认'd'
            */
            methodName:{
                type: Array,
                default: function(){return []}
            },
            dealy:{
                type: Number,
                default: 300
            }
        },  
        render(h){
            if(this.$slots.default === void 0){
                return;
            }          
            let _vnode =  this.$slots.default[0];
            return _vnode;
        },
        mounted(){
            if(this.$slots.default === void 0){
                return;
            }    

            function __debounce(cb,dealy,functionResult,vm){
                let clearId = void 0,
                _dealy = dealy,
                _result = void 0;
                
                return function(...args){
                    if(clearId){
                        clearTimeout(clearId);
                    }
                    
                    clearId = setTimeout(function(){
                        _result = cb.apply(vm,[...args]);
                        if(functionResult){
                            functionResult.call(vm,_result)
                        }
                    },_dealy);
                }
            }

            function __throttle(cb,dealy,functionResult,vm){
                let clearId = void 0,
                _dealy = dealy,
                _result = void 0,
                timeBegin = 0;

      
                return function(...args){
                    if(!timeBegin){
                        timeBegin = Date.now();
                    }

                    function doFunc(){
                        _result = cb.apply(vm,[...args]);
                        if(functionResult){
                            functionResult.call(vm,_result)
                        }
                        timeBegin = 0;
                    }
                    if(Date.now() - timeBegin  > _dealy){
                        clearTimeout(clearId)
                        doFunc()
                       
                    }else{
                        clearTimeout(clearId)
                        clearId = setTimeout(function(){
                            doFunc()
                        },_dealy);
                    }
                }
            }

            let _vnode =  this.$slots.default[0],
            {dealy,methodName} = this._props,
            vm = _vnode.context;

            if(vm._isVue && methodName.length > 0){
                methodName.forEach(item => {
                    let {name,functionResult,type} = item;
                    if(vm[name]){
                        type = (type === void 0 ? 'd' : type);
                        vm[name] = type === 'd' ? __debounce(vm[name],dealy,functionResult,vm) : __throttle(vm[name],dealy,functionResult,vm);
                    }
                });
            }
        }

    }
</script>