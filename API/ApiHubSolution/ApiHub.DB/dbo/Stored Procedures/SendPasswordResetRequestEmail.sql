
--[dbo].[SendPasswordResetRequestEmail] 'aniket.naik@mobikodetech.com'

CREATE PROCEDURE [dbo].[SendPasswordResetRequestEmail]
	(@EmailId NVARCHAR(150))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


	DECLARE @UserId INT = 1; -- Replace with the actual UserId
DECLARE @UserName NVARCHAR(255);
DECLARE @ResetPasswordToken NVARCHAR(40)=CAST(NEWID() AS NVARCHAR(MAX));

--DECLARE @ResetLink NVARCHAR(MAX)='http://localhost:4200/account/reset/'+@ResetPasswordToken;

DECLARE @ResetLink NVARCHAR(MAX)='https://592d-2401-4900-1c17-aea1-8c67-e008-8e62-7b20.ngrok-free.app/#/account/reset/'+@ResetPasswordToken;



-- Retrieve user data from the Users table
SELECT @UserName = FullName
FROM Users
WHERE EmailId= @EmailId;

DECLARE @EmailTemplate NVARCHAR(MAX)=(SELECT TemplateContent FROM Templates where TemplateId=1);
--PRINT @EmailTemplate;

SET @EmailTemplate = REPLACE(@EmailTemplate, '[User]', @UserName);
SET @EmailTemplate = REPLACE(@EmailTemplate, '[ResetLink]', @ResetLink);


PRINT 'New Template:'+@EmailTemplate;

	IF(EXISTS(SELECT 1 FROM Users WHERE UserName=@EmailId))
	BEGIN
		EXEC [dbo].[SendSystemEmail]
		@Recipients = @EmailId,
		@CC = 'aniket.naik@mobikodetech.com',
		@Body = @EmailTemplate,
		@Subject = 'GLOKODE- Reset Password',
		@TemplateID = 1,
		@Importance = 'HIGH';

		UPDATE Users SET ResetPasswordToken=@ResetPasswordToken, ResetPasswordTokenExpiryDate=GETDATE()+1 WHERE EmailId=@EmailId;

		SELECT 200 as StatusCode, 'Password reset email has been sent at your email address.' AS Message
		END		
		ELSE
			BEGIN 
			SELECT 400 as StatusCode, 'User does not exist.' AS Message
			END

END