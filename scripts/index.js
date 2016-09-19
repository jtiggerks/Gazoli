/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
            
          
          
            window.plugins.PushbotsPlugin.initialize("57d9ef734a9efa68228b489f", {"android":{"sender_id":"298683186474"}});
             
          
            // First time registration
            // This will be called on token registration/refresh with Android and with every runtime with iOS
            window.plugins.PushbotsPlugin.on("registered", function(token){

                if((localStorage.getItem('notificacoes') == 1)){
                    window.plugins.PushbotsPlugin.untag("active");
                    window.plugins.PushbotsPlugin.tag("inactive");
                }
                else{
                    window.plugins.PushbotsPlugin.untag("inactive");
                    window.plugins.PushbotsPlugin.tag("active");
                }

            });

            window.plugins.PushbotsPlugin.getRegistrationId(function(token){
                if((localStorage.getItem('notificacoes') == 1)){
                    window.plugins.PushbotsPlugin.untag("active");
                    window.plugins.PushbotsPlugin.tag("inactive");
                }
                else{
                    window.plugins.PushbotsPlugin.untag("inactive");
                    window.plugins.PushbotsPlugin.tag("active");
                }  
            });


            // Should be called once app receive the notification
            window.plugins.PushbotsPlugin.on("notification:received", function(data){
                
            });

            // Should be called once the notification is clicked
            window.plugins.PushbotsPlugin.on("notification:clicked", function(data){
                
                     v = JSON.stringify(data)

                    alert(v['mensage']);

                    $('#pagina-atual').val('POSTOS GAZOLI');
                    $('#titulo-header').html("<div style='margin-left: -70px;height: 35px;'>POSTOS GAZOLI</div>");
                    $('.header-controls').hide();
                    $("#voltar-header").hide();
                        e.preventDefault();
                        
                        var hideDeffered = $('#notificacoes, #vc-reporter, #podcast, #home, #podcast-player, #noticias, #abre-noticia, #radio, #mensagem').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
                        hideDeffered.promise().done(function() {
                            $('#posto').show("fade", { direction: "right", easing: 'easeInOutBack' }, 1000);
                      });

            });
 
 

/*
*/          },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
    }
};