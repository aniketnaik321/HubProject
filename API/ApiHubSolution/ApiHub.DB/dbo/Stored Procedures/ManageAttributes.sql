CREATE PROCEDURE ManageAttributes
    @AttributeId BIGINT = NULL,
    @SpecName NVARCHAR(250),
    @Description NVARCHAR(500),
    @TypeId INT,
    @IsEventAttribute BIT,
    @IsCommon BIT,
    @CreatedBy INT,
    @ModifiedBy INT,
    @IsRemoved INT = 0,
    @RemovedBy BIT,
    @RemovedOn DATETIME2(7)
AS
BEGIN
    -- Create (Insert) operation
    IF @AttributeId IS NULL
    BEGIN
        INSERT INTO [dbo].[Attributes] (
            [SpecName],
            [Description],
            [TypeId],
            [IsEventAttribute],
            [IsCommon],
            [CreatedOn],
            [CreatedBy],
            [ModifiedOn],
            [ModifiedBy],
            [IsRemoved],
            [RemovedBy],
            [RemovedOn]
        ) VALUES (
            @SpecName,
            @Description,
            @TypeId,
            @IsEventAttribute,
            @IsCommon,
            SYSDATETIME(),
            @CreatedBy,
            NULL,
            NULL,
            @IsRemoved,
            @RemovedBy,
            @RemovedOn
        );
    END
    -- Update operation
    ELSE
    BEGIN
        UPDATE [dbo].[Attributes]
        SET
            [SpecName] = @SpecName,
            [Description] = @Description,
            [TypeId] = @TypeId,
            [IsEventAttribute] = @IsEventAttribute,
            [IsCommon] = @IsCommon,
            [ModifiedOn] = SYSDATETIME(),
            [ModifiedBy] = @ModifiedBy,
            [IsRemoved] = @IsRemoved,
            [RemovedBy] = @RemovedBy,
            [RemovedOn] = @RemovedOn
        WHERE [AttributeId] = @AttributeId;
    END

    -- Delete operation
    IF @IsRemoved = 1 AND @AttributeId IS NOT NULL
    BEGIN
        DELETE FROM [dbo].[Attributes] WHERE [AttributeId] = @AttributeId;
    END
END