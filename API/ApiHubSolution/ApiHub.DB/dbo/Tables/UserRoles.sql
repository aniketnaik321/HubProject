CREATE TABLE [dbo].[UserRoles] (
    [UserRoleId] INT    IDENTITY (1, 1) NOT NULL,
    [UserId]     BIGINT NULL,
    [RoleId]     INT    NULL,
    CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED ([UserRoleId] ASC),
    CONSTRAINT [FK_UserRoles_Roles] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([RoleId]),
    CONSTRAINT [FK_UserRoles_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([UserId])
);



