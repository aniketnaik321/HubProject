CREATE TABLE [dbo].[Templates] (
    [TemplateId]      BIGINT         NOT NULL,
    [TemplateName]    NVARCHAR (150) NULL,
    [Description]     NVARCHAR (250) NULL,
    [TemplateType]    INT            CONSTRAINT [DF_Templates_TemplateType] DEFAULT ((1)) NULL,
    [TemplateContent] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Templates] PRIMARY KEY CLUSTERED ([TemplateId] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'1: Email Template', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Templates', @level2type = N'COLUMN', @level2name = N'TemplateType';

