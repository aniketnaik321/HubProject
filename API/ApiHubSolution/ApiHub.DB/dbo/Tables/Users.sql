CREATE TABLE [dbo].[Users] (
    [UserId]                       BIGINT         IDENTITY (1, 1) NOT NULL,
    [UserName]                     NVARCHAR (150) NULL,
    [passwordhash]                 NVARCHAR (MAX) NULL,
    [FullName]                     NVARCHAR (250) NULL,
    [EmailId]                      NVARCHAR (150) NULL,
    [RefreshToken]                 NVARCHAR (512) NULL,
    [ResetPasswordToken]           NVARCHAR (150) NULL,
    [ResetPasswordTokenExpiryDate] DATETIME2 (7)  NULL,
    [CreatedOn]                    DATETIME2 (7)  NULL,
    [CreatedBy]                    INT            NULL,
    [ModifiedOn]                   DATETIME2 (7)  NULL,
    [ModifiedBy]                   INT            NULL,
    [IsRemoved]                    BIT            CONSTRAINT [DF_Users_IsRemoved] DEFAULT ((0)) NOT NULL,
    [RemovedBy]                    INT            NULL,
    [RemovedOn]                    DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserId] ASC)
);





