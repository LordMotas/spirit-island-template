# Board

The fastest way to get started is to start from the example template in the folder adversary/example.

## Custom HTML Tag

The board template use a lot of custom HTML tags, here is a quick summary:

General Images: Every image in a board can be called by simply using its name as a separate tag. Here is a list of what is available:
- Elements (fire, water, earth, air, plant, animal, sun, moon)
- Invaders (explorer, town, city)
- Island symbols (blight, dahan, fear, disease, wilds, beast, strife, badlands)
- Land symbols (sand, mountain, jungle, wetland, ocean, jungle-wetland, jungle-sand, sand-wetland, mountain-jungle, mountain-wetland, mountain-sand)
- Targetting symbols (range-plus-one, range-0, range-1, range-2, range-3, range-4, player-spirit)


- **board**: Represent the whole board.
  - spirit-name: The name of the Spirit.
  - img class="spirit-image": The main Spirit image.
  - img class="spirit-border": The image that sits underneath the Spirit name.
  - special-rules-container: The container for the Special Rules
    - special-rules-subtitle: The name of the Special Rule.
    - special-rule: The rule itself.
  - **growth**: The container for the Growth Options
    - growth title: Usually "Growth (PICK ONE)" (For now, new features coming soon)
    - growth-group: Each individual section in the Growth section
      - growth-group class: The actual values that will be used to create the Growth section.
        - Supported Options:
          - reclaim-all: Reclaim All
          - reclaim-one: Reclaim One
          - discard-cards: Discard 2 Power Cards (as seen on Downpour)
          - gain-card-play: +1 Card Play this turn
          - gain-power-card: Gain Power Card
          - gain-energy(X): Gain X Energy
          - make-fast: One of your Powers may be Fast
          - add-presence(X): Add a Presence up to X Range
          - add-presence(X,Y): Add a Presence limited to Y Land type up to X Range
          - move-presence(X): Move a Presence up to X Range
          - presence-no-range: Add a presence anywhere (as seen on Finder)
          - ignore-range: Ignore Range this turn (as seen on Finder)
          - gain-element(X): Gain X Element (currently limited to only one)
  - **presence-tracks**: The container for the Presence Tracks
    - **energy-track**: The entire Energy Track (current functionality only supports one row)
      - energy-track values: The actual values that will be used to create the Energy Track
        - Supported Options:
          - Integer 1,2,3,4,5,6,7 etc.
          - Elements earth, fire, air, moon, water, plant, animal, sun, or any
          - Combinations of Elements/Energy: 3+earth, 2+fire, earth+any, water+plant
    - **card-play-track**: The entire Card Play Track (current functionality only supports one row)
      - card-play-track values: The actual values that will be used to create the Card Play Track
        - Supported Options:
          - Integer 1,2,3,4,5,6,7 etc.
          - Elements earth, fire, air, moon, water, plant, animal, sun, or any
          - Combinations of Elements/Energy: (3+earth, 2+fire, earth+any, water+plant
          - Reclaim One: reclaim-one, 3+reclaim-one, earth+reclaim-one
  - **innate-powers**: The container for the Innate Powers
    - innate-power: The container for a single Innate Power
      - class="fast": The Innate Power is Fast
      - class="slow": The Innate Power is Slow
      - innate-power-title: The title of the Innate Power
      - info-container: The container for the information
        - info-title: The box that provides the header for the speed, range, and target
        - info: The specific information for the above info-title
          - innate-info-speed: Taken care of by the class attribute of innate-power
          - innate-info-range: Defines the range of the Innate Power
            - option: option consists of the following: range-0, range-1, range-2, range-3, or range-4
            - Note: You can put in a sacred site by using the sacred-site tag
          - innate-info-target: Defines the target land for the Innate Power
            - Note: This may also be player-spirit 
      - description-container: The container for the description of the Innate Power
        - level: The container that holds each level of the Innate Power
          - threshold: The threshold portion of the Innate Power
            - Note: This is usually in the format of: x<element>Y<element> etc.
          - div class="description": What the Innate Power does
            - div id="single-line": Used when the description is only a single line (it fixes spacing issues)