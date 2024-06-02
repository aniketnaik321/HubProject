CREATE TABLE [dbo].[Machine] (
    [MachineId]   BIGINT         IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (250) NULL,
    [Description] NVARCHAR (500) NULL,
    [LocationId]  BIGINT         NULL,
    [CategoryId]  BIGINT         NULL,
    [CreatedOn]   DATETIME2 (7)  NULL,
    [CreatedBy]   INT            NULL,
    [ModifiedOn]  DATETIME2 (7)  NULL,
    [ModifiedBy]  INT            NULL,
    [IsRemoved]   BIT            CONSTRAINT [DF_Machine_IsRemoved] DEFAULT ((0)) NOT NULL,
    [RemovedBy]   INT            NULL,
    [RemovedOn]   DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Machine] PRIMARY KEY CLUSTERED ([MachineId] ASC),
    CONSTRAINT [FK_Machine_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category] ([CategoryId]),
    CONSTRAINT [FK_Machine_Location] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[Location] ([LocationId])
);









