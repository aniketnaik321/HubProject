CREATE TABLE [dbo].[AttributeLookups] (
    [LookupId]       BIGINT         NOT NULL,
    [Text]           NVARCHAR (150) NULL,
    [Value]          NVARCHAR (50)  NULL,
    [Description]    NVARCHAR (50)  NULL,
    [Icon]           NVARCHAR (MAX) NULL,
    [LabelColorCode] NVARCHAR (50)  NULL,
    CONSTRAINT [PK_AttributeLookups] PRIMARY KEY CLUSTERED ([LookupId] ASC)
);

