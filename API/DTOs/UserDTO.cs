//data we want to send back when a client has successfully logged in or registered

namespace API.DTOs {

    public class UserDTO {

        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }
    }
}