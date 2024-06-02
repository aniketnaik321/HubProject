
CREATE PROCEDURE [dbo].[ResetUserPassword]
	@Token nvarchar(250),
	@NewPassword NVARCHAR(MAX)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	IF(GETDATE()<(SELECT ResetPasswordTokenExpiryDate FROM Users WHERE ResetPasswordToken=@Token))
	BEGIN
		UPDATE Users
		SET          passwordhash = @NewPassword, ResetPasswordToken=NULL, ResetPasswordTokenExpiryDate=NULL
		WHERE  (ResetPasswordToken = @Token);
		SELECT 200 as StatusCode, 'Password reset successful, please login with your new password to continue' as Message
	END
		ELSE
			SELECT 400 as StatusCode, 'Link has been expired!' as Message


		
   
END