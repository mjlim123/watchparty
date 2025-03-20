package watchtogether.controllers;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import watchtogether.dtos.VideoDeleteRequest;

@Controller
public class WebsocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebsocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }


    @MessageMapping("/room/{roomCode}")
    @SendTo("/topic/room/{roomCode}")
    public String sendMessage(@DestinationVariable String roomCode, @Payload String message) {
        return message;
    }

    @MessageMapping("/room/{roomCode}/delete")
    @SendTo("/topic/room/{roomCode}/delete")
    public VideoDeleteRequest  deleteVideo(@DestinationVariable String roomCode, @Payload VideoDeleteRequest video) {
        System.out.println("HIT!");
        return video;
    }

}