import pandas as pd
import matplotlib.pyplot as plt

def lineChart():
    # Read your data from file
    file = "combined_data_for_histogram.json"
    df = pd.read_json(file, orient='records')

    # Define your grouping categories
    groups = ["7JSON", "7XML", "100JSON", "100XML", "1000JSON", "1000XML", "2000JSON", "2000XML"]

    # Initialize lists to store line data for JSON and XML
    json_lines_data = []
    xml_lines_data = []

    # Iterate over groups and calculate mean for each group
    for group in groups:
        group_data = df[group]
        if "JSON" in group:
            json_lines_data.append(group_data.mean() / 1000)  # Convert from ms to seconds
        else:
            xml_lines_data.append(group_data.mean() / 1000)  # Convert from ms to seconds

    # The x-position order of data points
    x_values = ["7", "100", "1000", "2000"]

    colors = ["#fA00ff", "#6fff79"]

    # Plot lines for JSON and XML data
    plt.plot(x_values, json_lines_data, marker='o', color=colors[0], label='JSON')
    plt.plot(x_values, xml_lines_data, marker='o', color=colors[1], label='XML')

    plt.ylabel('Average load time (seconds)')
    plt.xlabel('Number of articles')
    plt.title('Linediagram with all measurements (long)')
    plt.legend()
    plt.grid(True)

    # Set the y-axis limit
    plt.ylim(0, 0.35)

    plt.show()

lineChart()