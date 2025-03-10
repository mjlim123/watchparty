package watchtogether.controllers;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebsocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebsocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }


    @MessageMapping("/room/{roomCode}") // Maps to "/app/sendMessage" (prefix from configuration)
    public String sendMessage(@DestinationVariable String roomCode, String message) {
        return message;
    }
}