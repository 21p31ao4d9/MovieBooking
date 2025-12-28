namespace MovieBookingApp.Services.DTOs.Users
{
    public class ChangePasswordRequest
    {
        public string LoginID { get; set; } = string.Empty;
        public string OldPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
