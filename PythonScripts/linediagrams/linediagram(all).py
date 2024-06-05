import pandas as pd
import matplotlib.pyplot as plt


def linechart():
    # Read your data from file
    file = "combined_data_for_histogram.json"
    df = pd.read_json(file, orient='records')

    # Define your grouping categories
    groups = ["7JSON_long", "7XML_long", "100JSON_long", "100XML_long", "1000JSON_long", "1000XML_long",
              "2000JSON_long", "2000XML_long", "7JSON_short", "7XML_short", "100JSON_short", "100XML_short",
              "1000JSON_short", "1000XML_short", "2000JSON_short", "2000XML_short", "7JSON_mixed", "7XML_mixed",
              "100JSON_mixed", "100XML_mixed", "1000JSON_mixed", "1000XML_mixed", "2000JSON_mixed", "2000XML_mixed"]

    # Initialize lists to store line data for JSON and XML
    json_lines_data_long = []
    xml_lines_data_long = []
    json_lines_data_short = []
    xml_lines_data_short = []
    json_lines_data_mixed = []
    xml_lines_data_mixed = []

    # Iterate over groups and calculate mean for each group
    for group in groups:
        group_data = df[group]
        if "JSON_long" in group:
            json_lines_data_long.append(group_data.mean() / 1000)  # Convert from ms to seconds
        elif "XML_long" in group:
            xml_lines_data_long.append(group_data.mean() / 1000)  # Convert from ms to seconds
        elif "JSON_short" in group:
            json_lines_data_short.append(group_data.mean() / 1000)  # Convert from ms to seconds
        elif "XML_short" in group:
            xml_lines_data_short.append(group_data.mean() / 1000)  # Convert from ms to seconds
        elif "JSON_mixed" in group:
            json_lines_data_mixed.append(group_data.mean() / 1000)  # Convert from ms to seconds
        elif "XML_mixed" in group:
            xml_lines_data_mixed.append(group_data.mean() / 1000)  # Convert from ms to seconds

    # The x-position order of data points
    x_values = ["7", "100", "1000", "2000"]

    # Colors for JSON and XML lines
    colors = ["#640066", "#2C6630", "#fA00ff", "#6fff79", "#AF00B2", "#4DB254"]

    # Plot lines for JSON and XML data
    plt.plot(x_values, json_lines_data_long, marker='o', color=colors[0], label='JSON_long')
    plt.plot(x_values, xml_lines_data_long, marker='o', color=colors[1], label='XML_long')
    plt.plot(x_values, json_lines_data_short, marker='o', color=colors[2], label='JSON_short')
    plt.plot(x_values, xml_lines_data_short, marker='o', color=colors[3], label='XML_short')
    plt.plot(x_values, json_lines_data_mixed, marker='o', color=colors[4], label='JSON_mixed')
    plt.plot(x_values, xml_lines_data_mixed, marker='o', color=colors[5], label='XML_mixed')

    plt.ylabel('Average load time (seconds)')
    plt.xlabel('Number of articles')
    plt.title('Linediagram with all measurements (all)')
    plt.legend()
    plt.grid(True)

    # Set the y-axis limit
    plt.ylim(0, 0.35)

    plt.show()


# Call the function to display the chart
linechart()