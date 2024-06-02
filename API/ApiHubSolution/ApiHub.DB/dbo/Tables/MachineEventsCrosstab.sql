CREATE TABLE [dbo].[MachineEventsCrosstab] (
    [EventId]       BIGINT        IDENTITY (1, 1) NOT NULL,
    [MachineId]     BIGINT        NOT NULL,
    [EffectiveDate] DATETIME2 (7) NULL,
    [EntryDate]     DATETIME2 (7) NOT NULL,
    [CreatedBy]     BIGINT        NULL,
    [Col1]          NVARCHAR (50) NULL,
    [Col2]          NVARCHAR (50) NULL,
    [Col3]          NVARCHAR (50) NULL,
    [Col4]          NVARCHAR (50) NULL,
    [Col5]          NVARCHAR (50) NULL,
    [Col6]          NVARCHAR (50) NULL,
    [Col7]          NVARCHAR (50) NULL,
    [Col8]          NVARCHAR (50) NULL,
    [Col9]          NVARCHAR (50) NULL,
    [Col10]         NVARCHAR (50) NULL,
    CONSTRAINT [PK_MachineEventsCrosstab] PRIMARY KEY CLUSTERED ([EventId] ASC)
);



