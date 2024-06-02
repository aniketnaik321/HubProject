 
 
CREATE PROCEDURE [dbo].[SendSystemEmail]	-- Add the parameters for the stored procedure here
	(
	@Recipients NVARCHAR(MAX),
	@CC NVARCHAR(MAX)=null,
	@Body NVARCHAR(MAX),
	@Subject NVARCHAR(500),
	@TemplateID INT=1,
	@Importance NVARCHAR(50)='High'
	)
AS
BEGIN
	 SET NOCOUNT ON;
 
    -- Declare variables
    DECLARE @MailAttachment NVARCHAR(255);
 
  --SET @Body=(SELECT TemplateContent FROM Templates WHERE TemplateId=@TemplateID)
    -- Set attachment if provided

 
    -- Send email using sp_send_dbmail
    EXEC msdb.dbo.sp_send_dbmail
        @profile_name = 'GLOKODE', -- Replace with your Database Mail profile name
        @recipients = @Recipients,
		@copy_recipients=@CC,
        @subject = @Subject,
        @body = @Body,
        @body_format = 'HTML', -- Can be 'TEXT' or 'HTML',
		@importance=@Importance

 
    -- Check for errors
    IF @@ERROR <> 0
    BEGIN
        RAISERROR('Error sending email.', 16, 1);
        RETURN;
    END
 
END