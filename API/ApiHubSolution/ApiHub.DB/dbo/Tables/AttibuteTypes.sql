CREATE TABLE [dbo].[AttibuteTypes] (
    [DataTypeId]  INT           NOT NULL,
    [DataType]    NVARCHAR (50) NULL,
    [Description] NVARCHAR (50) NULL,
    CONSTRAINT [PK_SpecDataTypes] PRIMARY KEY CLUSTERED ([DataTypeId] ASC)
);

