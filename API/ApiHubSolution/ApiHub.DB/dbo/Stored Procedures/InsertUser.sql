CREATE PROCEDURE [dbo].[InsertUser]
    @UserName NVARCHAR(150),
    @PasswordHash NVARCHAR(MAX),
    @FullName NVARCHAR(250),
    @EmailId NVARCHAR(150)
    
AS
BEGIN
    -- Check if the username already exists
    IF NOT EXISTS (SELECT 1 FROM Users WHERE UserName = @UserName)
    BEGIN
        -- Check if the email already exists
        IF NOT EXISTS (SELECT 1 FROM Users WHERE EmailId = @EmailId)
        BEGIN
            -- If both username and email are unique, insert the new user
            INSERT INTO Users (UserName, PasswordHash, FullName, EmailId, CreatedOn, CreatedBy, ModifiedOn)
            VALUES (@UserName, @PasswordHash, @FullName, @EmailId, GETUTCDATE(), NULL,GETUTCDATE() );
            
          SELECT 200 as StatusCode, 'User Created Succesfully' as Message;
        END
        ELSE
        BEGIN
            -- Email already exists
            SELECT 400 as StatusCode, 'Email Already Exist' as Message;
        END
    END
    ELSE
    BEGIN
        -- Username already exists
      SELECT 400 as StatusCode, 'User Name Already Exist' as Message;
    END
END;