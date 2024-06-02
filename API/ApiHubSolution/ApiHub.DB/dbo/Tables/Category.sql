CREATE TABLE [dbo].[Category] (
    [CategoryId]   BIGINT         IDENTITY (1, 1) NOT NULL,
    [CategoryName] NVARCHAR (150) NULL,
    [Description]  NVARCHAR (500) NULL,
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED ([CategoryId] ASC)
);





