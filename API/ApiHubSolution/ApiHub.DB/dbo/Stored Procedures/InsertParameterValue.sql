CREATE PROCEDURE InsertParameterValue
(
    @ReportTemplateId BIGINT,
    @name NVARCHAR(150),
    @Description NVARCHAR(250),
    @Columns NVARCHAR(MAX),
    @Filters NVARCHAR(MAX),
    @CreatedOn DATETIME2(7),
    @CreatedBy INT,
    @ModifiedOn DATETIME2(7),
    @ModifiedBy INT,
    @IsRemoved BIT,
    @RemovedBy INT,
    @RemovedOn DATETIME2(7),
    @StatusCode INT OUTPUT,
    @Message NVARCHAR(250) OUTPUT
)
AS
BEGIN
    BEGIN TRY
        INSERT INTO ReportTemplates (
            ReportTemplateId, name, Description, Columns,
            Filters, CreatedOn, CreatedBy, ModifiedOn, ModifiedBy,
            IsRemoved, RemovedBy, RemovedOn
        )
        VALUES (
            @ReportTemplateId, @name, @Description, @Columns,
            @Filters, @CreatedOn, @CreatedBy, @ModifiedOn, @ModifiedBy,
            @IsRemoved, @RemovedBy, @RemovedOn
        );

        SET @StatusCode = 200;
        SET @Message = 'Record added successfully.';
    END TRY
    BEGIN CATCH
        SET @StatusCode = 400;
        SET @Message = 'Error while adding record.';
    END CATCH;
END;