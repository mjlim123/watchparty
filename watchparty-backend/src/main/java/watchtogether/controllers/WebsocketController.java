package watchtogether.controllers;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import watchtogether.dtos.VideoAddRequest;
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

        return video;
    }

    @MessageMapping("/room/{roomCode}/add")
    @SendTo("/topic/room/{roomCode}/add")
    public VideoAddRequest addVideo(@DestinationVariable String roomCode, @Payload VideoAddRequest video) {

        return video;
    }

    @MessageMapping("/room/{roomCode}/change")
    @SendTo("/topic/room/{roomCode}/change")
    public String changeVideo(String video) {

        return video;
    }

    @MessageMapping("/room/{roomCode}/pause")
    @SendTo("/topic/room/{roomCode}/pause")
    public String pauseVideo(String video) {

        return video;
    }

    @MessageMapping("/room/{roomCode}/play")
    @SendTo("/topic/room/{roomCode}/play")
    public String playVideo(String video) {

        return video;
    }

    @MessageMapping("/room/{roomCode}/seek")
    @SendTo("/topic/room/{roomCode}/seek")
    public String seekVideo(String video) {

        return video;
    }
}