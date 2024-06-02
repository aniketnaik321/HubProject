using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ApiHub.Domain.Models;

public partial class HrliteDbContext : DbContext
{
    public HrliteDbContext()
    {
    }

    public HrliteDbContext(DbContextOptions<HrliteDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Attendance> Attendances { get; set; }

    public virtual DbSet<AttendanceType> AttendanceTypes { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<EmployeeDetail> EmployeeDetails { get; set; }

    public virtual DbSet<EmployeePayroll> EmployeePayrolls { get; set; }

    public virtual DbSet<EmployeePayrollDetail> EmployeePayrollDetails { get; set; }

    public virtual DbSet<Issue> Issues { get; set; }

    public virtual DbSet<IssueDocument> IssueDocuments { get; set; }

    public virtual DbSet<JobPosition> JobPositions { get; set; }

    public virtual DbSet<Payelement> Payelements { get; set; }

    public virtual DbSet<Priority> Priorities { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<ProjectDocument> ProjectDocuments { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<Timesheet> Timesheets { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserProfile> UserProfiles { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    public virtual DbSet<WorkLog> WorkLogs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=.\\sqlexpress;Initial Catalog=HRLite_DB;User ID=admin;Password=admin;MultipleActiveResultSets=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Attendance>(entity =>
        {
            entity.ToTable("Attendance");

            entity.Property(e => e.AttendanceLocation).HasMaxLength(500);
            entity.Property(e => e.AttendanceTypeId).HasComment("Work from Home, Office, Remote");

            entity.HasOne(d => d.AttendanceType).WithMany(p => p.Attendances)
                .HasForeignKey(d => d.AttendanceTypeId)
                .HasConstraintName("FK_Attendance_AttendanceType");

            entity.HasOne(d => d.Employee).WithMany(p => p.Attendances)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK_Attendance_EmployeeDetail");
        });

        modelBuilder.Entity<AttendanceType>(entity =>
        {
            entity.ToTable("AttendanceType");

            entity.Property(e => e.Description).HasMaxLength(550);
            entity.Property(e => e.Title).HasMaxLength(150);
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.Property(e => e.UserComment).HasMaxLength(600);

            entity.HasOne(d => d.Issue).WithMany(p => p.Comments)
                .HasForeignKey(d => d.IssueId)
                .HasConstraintName("FK_Comments_Issues");

            entity.HasOne(d => d.ParentComment).WithMany(p => p.InverseParentComment)
                .HasForeignKey(d => d.ParentCommentId)
                .HasConstraintName("FK_Comments_Comments");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Comments_Users");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.ToTable("Department");

            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Title).HasMaxLength(150);
        });

        modelBuilder.Entity<EmployeeDetail>(entity =>
        {
            entity.ToTable("EmployeeDetail");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CurrentAddress).HasMaxLength(500);
            entity.Property(e => e.FullName).HasMaxLength(150);
            entity.Property(e => e.PermanentAddress).HasMaxLength(500);
            entity.Property(e => e.PhotoUrl).HasMaxLength(250);

            entity.HasOne(d => d.Department).WithMany(p => p.EmployeeDetails)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK_EmployeeDetail_Department");

            entity.HasOne(d => d.JobPosition).WithMany(p => p.EmployeeDetails)
                .HasForeignKey(d => d.JobPositionId)
                .HasConstraintName("FK_EmployeeDetail_JobPosition");
        });

        modelBuilder.Entity<EmployeePayroll>(entity =>
        {
            entity.ToTable("EmployeePayroll");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.GrossSalary).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.NetSalary).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeePayrolls)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK_EmployeePayroll_EmployeeDetail");
        });

        modelBuilder.Entity<EmployeePayrollDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.EmployeePayroll).WithMany(p => p.EmployeePayrollDetails)
                .HasForeignKey(d => d.EmployeePayrollId)
                .HasConstraintName("FK_EmployeePayrollDetails_EmployeePayroll");

            entity.HasOne(d => d.Payelement).WithMany(p => p.EmployeePayrollDetails)
                .HasForeignKey(d => d.PayelementId)
                .HasConstraintName("FK_EmployeePayrollDetails_Payelement");
        });

        modelBuilder.Entity<Issue>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Issues__6C861624C020BA8A");

            entity.Property(e => e.AssigneeUserId).HasColumnName("AssigneeUserID");
            entity.Property(e => e.IssueKey).HasMaxLength(15);
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            entity.Property(e => e.ReporterUserId).HasColumnName("ReporterUserID");
            entity.Property(e => e.Summary).HasMaxLength(255);

            entity.HasOne(d => d.Priority).WithMany(p => p.Issues)
                .HasForeignKey(d => d.PriorityId)
                .HasConstraintName("FK_Issues_Priority");

            entity.HasOne(d => d.Project).WithMany(p => p.Issues)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("FK_Issues_Project");

            entity.HasOne(d => d.Status).WithMany(p => p.Issues)
                .HasForeignKey(d => d.StatusId)
                .HasConstraintName("FK_Issues_Status");
        });

        modelBuilder.Entity<IssueDocument>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.DocumentTitle).HasMaxLength(50);
            entity.Property(e => e.DocumentUrl)
                .HasMaxLength(500)
                .HasColumnName("DocumentURL");

            entity.HasOne(d => d.Issue).WithMany(p => p.IssueDocuments)
                .HasForeignKey(d => d.IssueId)
                .HasConstraintName("FK_IssueDocuments_Issues");
        });

        modelBuilder.Entity<JobPosition>(entity =>
        {
            entity.ToTable("JobPosition");

            entity.Property(e => e.JobDescription).HasMaxLength(150);
            entity.Property(e => e.JobTile).HasMaxLength(150);
            entity.Property(e => e.SalaryBand).HasMaxLength(50);
        });

        modelBuilder.Entity<Payelement>(entity =>
        {
            entity.ToTable("Payelement");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.IsDeduction).HasDefaultValueSql("((0))");
            entity.Property(e => e.Title).HasMaxLength(150);
        });

        modelBuilder.Entity<Priority>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Priority__D0A3D0DE73D7FE89");

            entity.ToTable("Priority");

            entity.Property(e => e.PriorityName).HasMaxLength(50);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.ToTable("Project");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.ProjectName).HasMaxLength(150);
            entity.Property(e => e.ProjectTaskPrefix).HasMaxLength(2);
        });

        modelBuilder.Entity<ProjectDocument>(entity =>
        {
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.DocumentTitle).HasMaxLength(250);
            entity.Property(e => e.DocumentUrl)
                .HasMaxLength(512)
                .HasColumnName("DocumentURL");

            entity.HasOne(d => d.Project).WithMany(p => p.ProjectDocuments)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("FK_ProjectDocuments_Project");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.RoleTitle).HasMaxLength(150);
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Status__C8EE204307323CBB");

            entity.ToTable("Status");

            entity.Property(e => e.StatusName).HasMaxLength(50);
        });

        modelBuilder.Entity<Timesheet>(entity =>
        {
            entity.HasNoKey();
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.EmailId).HasMaxLength(150);
            entity.Property(e => e.EmailVerificationToken).HasMaxLength(512);
            entity.Property(e => e.FullName).HasMaxLength(250);
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("((1))");
            entity.Property(e => e.Passwordhash).HasColumnName("passwordhash");
            entity.Property(e => e.PicturePath).HasMaxLength(250);
            entity.Property(e => e.RefreshToken).HasMaxLength(512);
            entity.Property(e => e.ResetPasswordToken).HasMaxLength(150);
            entity.Property(e => e.UserName).HasMaxLength(150);
        });

        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.ToTable("UserProfile");

            entity.HasOne(d => d.User).WithMany(p => p.UserProfiles)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_UserProfile_Users");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.ToTable("UserRole");

            entity.HasOne(d => d.Role).WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_UserRole_Roles");

            entity.HasOne(d => d.User).WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_UserRole_Users");
        });

        modelBuilder.Entity<WorkLog>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("WorkLog");

            entity.Property(e => e.ConsolidatedTask).HasMaxLength(500);

            entity.HasOne(d => d.Issue).WithMany()
                .HasForeignKey(d => d.IssueId)
                .HasConstraintName("FK_WorkLog_Issues");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
