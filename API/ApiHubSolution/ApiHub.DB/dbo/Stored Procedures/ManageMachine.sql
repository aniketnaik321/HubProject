CREATE PROCEDURE [dbo].[ManageMachine]
    @MachineId BIGINT = NULL,
    @Name NVARCHAR(250),
	@Description NVARCHAR(500),
    @LocationId INT,
    @CategoryId INT,   
    @CreatedBy INT,
    @ModifiedOn DATETIME2 = NULL,
    @ModifiedBy INT = NULL,
    @IsRemoved INT = NULL,
    @RemovedBy BIT,
    @RemovedOn DATETIME2 = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Create
    IF @MachineId IS NULL
    BEGIN
        INSERT INTO Machine(Name,Description, LocationId, CategoryId, CreatedOn, CreatedBy, RemovedBy, RemovedOn)
        VALUES (@Name, @Description,@LocationId, @CategoryId, GETUTCDATE(), @CreatedBy, @RemovedBy, @RemovedOn);

        SELECT SCOPE_IDENTITY() AS Result; -- Return the new identity value
    END
    ELSE
    -- Update
    BEGIN
        UPDATE Machine
        SET
            Name = @Name,
            LocationId = @LocationId,
            CategoryId = @CategoryId,
            ModifiedOn = @ModifiedOn,
            ModifiedBy = @ModifiedBy,
            IsRemoved = @IsRemoved
        WHERE
            MachineId = @MachineId;

        -- Optional: Check if the update affected any rows
        IF @@ROWCOUNT > 0
        BEGIN
            SELECT 1 AS Result; -- Success
        END
        ELSE
        BEGIN
            SELECT 0 AS Result; -- No rows affected, possibly the record doesn't exist
        END
    END

    -- Soft Delete
    IF @IsRemoved = 1
    BEGIN
        UPDATE Machine
        SET
            IsRemoved = 1,
            RemovedBy = @RemovedBy,
            RemovedOn = @RemovedOn
        WHERE
            MachineId = @MachineId;

        -- Optional: Check if the update affected any rows
        IF @@ROWCOUNT > 0
        BEGIN
            SELECT 1 AS Result; -- Success
        END
        ELSE
        BEGIN
            SELECT 0 AS Result; -- No rows affected, possibly the record doesn't exist
        END
    END
END



