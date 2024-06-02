CREATE TABLE [dbo].[Attributes] (
    [AttributeId]      BIGINT         IDENTITY (1, 1) NOT NULL,
    [SpecName]         NVARCHAR (250) NULL,
    [Description]      NVARCHAR (500) NULL,
    [TypeId]           INT            NULL,
    [UnitType]         NVARCHAR (50)  NULL,
    [IsEventAttribute] BIT            CONSTRAINT [DF_Attributes_IsEventAttribute] DEFAULT ((0)) NULL,
    [IsCommon]         BIT            CONSTRAINT [DF_Attributes_IsCommon] DEFAULT ((0)) NULL,
    [CreatedOn]        DATETIME2 (7)  NULL,
    [CreatedBy]        INT            NULL,
    [ModifiedOn]       DATETIME2 (7)  NULL,
    [ModifiedBy]       INT            NULL,
    [IsRemoved]        BIT            NOT NULL,
    [RemovedBy]        INT            CONSTRAINT [DF_Specifications_RemovedBy] DEFAULT ((0)) NULL,
    [RemovedOn]        DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Specifications] PRIMARY KEY CLUSTERED ([AttributeId] ASC),
    CONSTRAINT [FK_Attributes_AttibuteTypes] FOREIGN KEY ([TypeId]) REFERENCES [dbo].[AttibuteTypes] ([DataTypeId])
);





