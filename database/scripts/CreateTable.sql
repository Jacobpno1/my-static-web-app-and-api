DROP TABLE IF EXISTS [dbo].[products]
GO

CREATE TABLE [dbo].[products] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Name]        VARCHAR (100) NULL,
    [Description] VARCHAR (500) NULL,
    [Quantity]    INT           NULL
);
GO

DELETE FROM dbo.products
GO

INSERT INTO dbo.products
  ([Name], [Description], [Quantity])
VALUES
  ('Strawberries', '16oz package of fresh organic strawberries', 1),
  ('Sliced bread', 'Loaf of fresh sliced wheat bread', 1),
  ('Apples', 'Bag of 7 fresh McIntosh apples', 1);
GO

