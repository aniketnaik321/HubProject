CREATE TABLE [dbo].[UserDashboard] (
    [UserDashboardId]     BIGINT         IDENTITY (1, 1) NOT NULL,
    [WidgetId]            INT            NULL,
    [WidgetConfiguration] NVARCHAR (MAX) NULL,
    [DisplayOrder]        INT            NULL,
    [DatasetQuery]        NVARCHAR (MAX) NULL,
    [CreatedOn]           DATETIME2 (7)  NULL,
    [CreatedBy]           INT            NULL,
    [ModifiedOn]          DATETIME2 (7)  NULL,
    [ModifiedBy]          INT            NULL,
    [IsRemoved]           BIT            NOT NULL,
    [RemovedBy]           INT            CONSTRAINT [DF_UserDashboard_RemovedBy] DEFAULT ((0)) NULL,
    [RemovedOn]           DATETIME2 (7)  NULL,
    CONSTRAINT [PK_UserDashboard] PRIMARY KEY CLUSTERED ([UserDashboardId] ASC)
);

