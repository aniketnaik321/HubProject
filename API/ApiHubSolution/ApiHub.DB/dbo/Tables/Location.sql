CREATE TABLE [dbo].[Location] (
    [LocationId]     BIGINT         IDENTITY (1, 1) NOT NULL,
    [LocationTitle]  NVARCHAR (150) NULL,
    [LocationDetail] NVARCHAR (150) NULL,
    [CreatedOn]      DATETIME2 (7)  NULL,
    [CreatedBy]      INT            NULL,
    [ModifiedOn]     DATETIME2 (7)  NULL,
    [ModifiedBy]     INT            NULL,
    [IsRemoved]      BIT            CONSTRAINT [DF_Location_IsRemoved] DEFAULT ((0)) NOT NULL,
    [RemovedBy]      INT            NULL,
    [RemovedOn]      DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED ([LocationId] ASC)
);







