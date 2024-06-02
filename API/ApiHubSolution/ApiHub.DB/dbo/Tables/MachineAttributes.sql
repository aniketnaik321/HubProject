CREATE TABLE [dbo].[MachineAttributes] (
    [MachineAttributeId] BIGINT IDENTITY (1, 1) NOT NULL,
    [AttributeId]        BIGINT NULL,
    [MachineId]          BIGINT NULL,
    [DataColId]          INT    NULL,
    CONSTRAINT [PK_MachineAttributes] PRIMARY KEY CLUSTERED ([MachineAttributeId] ASC),
    CONSTRAINT [FK_MachineAttributes_Attributes] FOREIGN KEY ([AttributeId]) REFERENCES [dbo].[Attributes] ([AttributeId]),
    CONSTRAINT [FK_MachineAttributes_Machine] FOREIGN KEY ([MachineId]) REFERENCES [dbo].[Machine] ([MachineId])
);



