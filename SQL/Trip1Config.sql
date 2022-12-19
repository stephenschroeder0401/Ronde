


insert into Rooms (Description, TripId)
values('Master Bedroom', 1),
('Bunk Room', 1),
('Shared Room', 1);

INSERT INTO Spots (Title, Description, TripId, RoomId, IsPrivate, MaxGuests)
values
('King Bed', 'King Bed in a private Room',1, 1, 1, 2),
('Bottom Bunk (Queen)', 'Queen sized bottom bunk bed',1, 2, 0, 1),
('Top Bunk (Single)', 'Single top bunk bed',1, 2, 0, 1),
('Single Bed #1', 'Single bed in 2 person shared room',1, 3, 0, 1),
('Single Bed 21', 'Single bed in 2 person shared room',1, 3, 0, 1);


INSERT INTO Stints(TripId, StartDate, EndDate)
VALUES(1, '2022-01-20','2022-01-23'),
(1, '2022-01-23','2022-01-27'),
(1, '2022-01-27','2022-01-30');

select * from SpotPrices

INSERT INTO SpotPrices (SpotId, StintId, Amount)
Values
(1, 1, '200.00'),
(1, 2, '200.00'),
(1, 3, '200.00'),
(2, 1, '125.00'),
(2, 2, '125.00'),
(2, 3, '125.00'),
(3, 1, '75.00'),
(3, 2, '75.00'),
(3, 3, '75.00'),
(4, 1, '100.00'),
(4, 2, '100.00'),
(4, 3, '100.00'),
(5, 1, '100.00'),
(5, 2, '100.00'),
(5, 3, '100.00')

