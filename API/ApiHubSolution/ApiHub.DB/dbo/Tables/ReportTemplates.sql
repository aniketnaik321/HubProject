CREATE TABLE [dbo].[ReportTemplates] (
    [ReportTemplateId] BIGINT         IDENTITY (1, 1) NOT NULL,
    [Name]             NVARCHAR (150) NULL,
    [Description]      NVARCHAR (250) NULL,
    [Columns]          NVARCHAR (MAX) NULL,
    [Filters]          NVARCHAR (MAX) NULL,
    [CreatedOn]        DATETIME2 (7)  NULL,
    [CreatedBy]        INT            NULL,
    [ModifiedOn]       DATETIME2 (7)  NULL,
    [ModifiedBy]       INT            NULL,
    [IsRemoved]        BIT            CONSTRAINT [DF_ReportTemplates_IsRemoved] DEFAULT ((0)) NOT NULL,
    [RemovedBy]        INT            CONSTRAINT [DF_ReportTemplates_RemovedBy] DEFAULT ((0)) NULL,
    [RemovedOn]        DATETIME2 (7)  NULL,
    CONSTRAINT [PK_ReportTemplates] PRIMARY KEY CLUSTERED ([ReportTemplateId] ASC)
);

