$(function() {

            function text(name,id){

               var val = document.getElementById(id).value;
               return "<div>" + name + val + "</div>"

            }

            function getEmoji(name,id){

             function marks(id){
                    var el = document.getElementById(id);
                    var val = el.options[el.selectedIndex].value;
                    return val;
                }   

                var gd = "&#x1f315",
                    bad = "&#x1f311";

                switch ( marks(id) ) {
                  case "1":
                    return name + gd+bad+bad+bad+bad+ "<br>";
                    break;
                  case "2":
                    return name + gd+gd+bad+bad+bad+ "<br>";
                    break;
                  case "3":
                    return name + gd+gd+gd+bad+bad+"<br>";
                    break;
                  case "4":
                    return name + gd+gd+gd+gd+bad+ "<br>";
                    break;
                  case "5":
                    return name + gd+gd+gd+gd+gd+ "<br>";
                    break;
                }

            }

            $('#gen-btn').on('click',function(event){
                event.preventDefault();


                $('#result').append( 
                    // text ('餐廳名稱：'  , 'shop-name')        + 
                    text (''     , 'shop-intro')       +
                    text (''  , 'dish-name')        +
                    text (''  , 'dish-comment')    +
                    getEmoji('&#x2764 味道：'  , 'taste-marks')     +
                    getEmoji('&#x1f335 環境：'  , 'place-marks')     +
                    getEmoji('&#x1f4bc 服務：'  , 'serve-marks')     +
                    getEmoji('&#x1f4b0 價錢：'  , 'price-marks')     +
                    getEmoji('&#x1f3f5 CP值：'  , 'cp-marks')        +
                    getEmoji('&#x2763 回頭：'  , 'return-marks')    +
                    text('&#x1f4cd'   , 'shop-address')
                    );

                returnHashtag()




            })



            //HashTag

            var inputElm = document.querySelector('#hash-input'),
                whitelist = ["a","aa","aaa"]
            
            var tagify = new Tagify (inputElm,{
                editTags:  1,
                placeholder: "HashTag"
            });
        
                tagify.on('add', onAddTag)
                      .on('input', onInput);



            var mockAjax = ( function mockAjax(){
                    var timeout;
                    return function(duration){
                        clearTimeout(timeout); // abort last request
                        return new Promise(function(resolve, reject){
                            timeout = setTimeout(resolve, duration || 300, whitelist)
                        })
                    }
                })()



           function onAddTag(e){

                console.log("onAddTag: ", e.detail);
                console.log("original input value: ", inputElm.value);
                
                tagify.off('add',function(){
                    //callback
                }) 
            } 

            // on character(s) added/removed (user is typing/deleting)
            function onInput(e){
                console.log("onInput: ", e.detail);
                tagify.settings.whitelist.length = 0; // reset current whitelist
                tagify.loading(true).dropdown.hide.call(tagify) // show the loader animation

                // get new whitelist from a delayed mocked request (Promise)
                mockAjax()
                    .then(function(result){
                        // replace tagify "whitelist" array values with new values
                        // and add back the ones already choses as Tags
                        tagify.settings.whitelist.push(...result, ...tagify.value)

                        // render the suggestions dropdown.
                        tagify.loading(false).dropdown.show.call(tagify, e.detail.value);
                    })
            }


            function returnHashtag(){

                //Grap All the Tag Text
                var tag = $('tag');

                for( i = 1; i <= tag.length; i ++){
                   var x =  $('tag:nth-child('+ i + ')' ).text();  
                   $('#result').append("#" + x);
                }

            }




        })