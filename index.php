<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Automata</title>
        <link rel="icon" type="image/png" href="images/layer-shape-curve.png" />
        <link href='css/style.css' rel='stylesheet' />
        <link href='css/runner.css' rel='stylesheet' />
        <link href='css/share.css' rel='stylesheet' />
        <link href='css/font-awesome.min.css' rel='stylesheet' />
    </head>
    <body>

        <div id="menu-btn">
            <i class="fa fa-bars"></i>
        </div>

        <aside id="menu" class="slide-right">
            <h1 class="logo">Automatus</h1>
            <h1>Configuration</h1>
            <ol class='toolbar'>
                <li class='spec-area'><a href='#'><i class="fa fa-terminal"></i> Open Automatus</a></li>
                <li class='selected move'><a href='#'><i class="fa fa-arrows"></i> Move States</a></li>
                <li class='transition'><a href='#'><i class="fa fa-arrow-right"></i> Create Transition</a></li>
                <li class='run'><a href='#'><i class="fa fa-play"></i> Run</a></li>
            </ol>
            <h1>Algorithms</h1>
            <ol class='toolbar'>
                <li class='afn-afd'><a href='#'>AFN -> AFD</a></li>
                <li class='operation-trim'><a href='#'>Trim</a></li>
                <li class='operation-parallel'><a href='#'>Parallel Composition</a></li>
                <li class='operation-product'><a href='#'>Product Operation</a></li>
                <li class='minimization'><a href='#'>Minimization</a></li>
            </ol>
            <h1>Extras</h1>
            <ol class='toolbar'>
                <li class='credits-area'><a href='#'><i class="fa fa-group"></i> Credits</a></li>
            </ol>
        </aside>


        <div class="automatus-spec-area">
            <i class="close spec-area fa fa-times"></i>
            <textarea rows="5" cols="">
s s0 -i
s s1
s s2 -f
t s0 s1 a
t s1 s2
            </textarea>
            <span class='spec-area-confirm'><a href='#' class="btn"><span></span>Confirm</a></span>
        </div>
        <div class="automatus-credits-area">
            <img src="images/pedro.jpg"/><span>Pedro</span>
            <img src="images/matheus.jpg"/><span>Matheus</span>
            <img src="images/jeff.jpg"/><span>Jefferson</span>
        </div>
        

        <div class='runner'>
            <div class='window'>
                <a href='' class='close' title='Stop automaton execution'></a>
                <h2 id='runstatus'>Running</h2>
                <ol id='runinput'></ol>
                <ol>
                    <li class='rewind button'><a href='' title='Restart automaton'><span></span></a></li>
                    <li class='prev button'><a href='' title='Step backward'><span></span></a></li>
                    <li class='fastforward button' title='Finish execution'><a href=''><span></span></a></li>
                    <li class='next button'><a href='' title='Step forward'><span></span></a></li>
                </ol>
            </div>
        </div>
        
        <div id='editor'>
            <label for="insertError" style="position:absolute; height:10px; color:red; font:bold 14px Georgia, serif; width:100px; left:200px; top:200px; display: none" id="errorSymbol">Wrong symbol!</label>
            <input type="text" size='8' style='position:absolute;height:20px;width:80px;left:0px;top:0px;display:none' id="inputSymbol" />
            <input type="text" size='8' style='position:absolute;height:30px;width:30px;left:0px;top:0px;display:none' id="changeStateName" />
            <canvas width='800' height='800'></canvas>
        </div>

        <script src='js/debug.js'></script>
        <script src='js/object.js'></script>
        <script src='js/eventemitter.js'></script>
        <script src='js/server.js'></script>
        <script src='js/math.js'></script>
        <script src='js/geometry.js'></script>
        <script src='js/automaton.js'></script>
        <script src='js/automatonview.js'></script>
        <script src='js/render.js'></script>
        <script src='js/editor.js'></script>
        <script src='js/test.js'></script>
        <script src='js/jquery-1.7.2.min.js'></script>
        <script src='js/hidpi-canvas.min.js'></script>
        <script src='js/runner.js'></script>
        <script src='js/ui.js'></script>
        <script src='js/automatus.js'></script>
        <script type="text/javascript">
            (function($){
                $(document).ready(function(){
                    $("#menu-btn").on('click', function(e){
                        e.preventDefault();
                        var $this = $(this);
                        if(!$this.attr("open")){
                            $this.attr("open", "open");
                            $("#menu").addClass("open");
                        }else{
                            $this.attr("open", null);
                            $("#menu").removeClass("open");
                        }
                    });
                });
            })(jQuery);
        </script>
    </body>
</html>
