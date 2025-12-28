namespace MovieBookingApp.Dtos.Users
{
    public class ForgotPasswordRequest
    {

        public string LoginID { get; set; } // identify the user
        public string NewPassword { get; set; } // directly set new password }
    }
}
