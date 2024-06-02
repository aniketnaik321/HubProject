CREATE TABLE [dbo].[Widgets] (
    [WidgetId]    BIGINT         NOT NULL,
    [Title]       NVARCHAR (150) NULL,
    [Description] NVARCHAR (250) NULL,
    [WidgetSVG]   NVARCHAR (MAX) NULL,
    [CreatedOn]   DATETIME2 (7)  NULL,
    [CreatedBy]   INT            NULL,
    [ModifiedOn]  DATETIME2 (7)  NULL,
    [ModifiedBy]  INT            NULL,
    [IsRemoved]   BIT            CONSTRAINT [DF_Widgets_IsRemoved] DEFAULT ((0)) NOT NULL,
    [RemovedBy]   INT            NULL,
    [RemovedOn]   DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Widgets] PRIMARY KEY CLUSTERED ([WidgetId] ASC)
);



